import { Feather, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableHighlight, TextInput, TouchableOpacity } from 'react-native';
import { ProductProps } from '../../../@types/product';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';

import { listStyles } from './styles';

interface ProductListProps {
    products: ProductProps[]
    editMode: boolean
    setNewStock: React.Dispatch<React.SetStateAction<Map<number, number>>>
    newStock: Map<number, number>
    setModal: React.Dispatch<React.SetStateAction<{
        showModal: boolean;
        options: {
            productId: number;
            type: 'add' | 'sub';
            initialStock: number;
        };
    }>>
    // setStockModalId: React.Dispatch<React.SetStateAction<number>>
}
export function StockList({ products, editMode, setNewStock, newStock, setModal }: ProductListProps) {
    return (
        <View style={[listStyles.container]}>
            <Text style={[listStyles.title, { color: Colors.gray }]}>{products[0].type_product}</Text>
            <FlatList
                data={products}
                renderItem={(product) => <StockListItem setModal={setModal} product={product.item} newStock={newStock} setNewStock={setNewStock} editMode={editMode} />}
                bounces
            />
        </View>
    )
}

interface StockListItemProps {
    product: ProductProps
    editMode: boolean
    setNewStock: React.Dispatch<React.SetStateAction<Map<number, number>>>
    newStock: Map<number, number>
    setModal: React.Dispatch<React.SetStateAction<{
        showModal: boolean;
        options: {
            productId: number;
            type: 'add' | 'sub';
            initialStock: number;
        };
    }>>
}
function StockListItem({ product, editMode, setNewStock, newStock, setModal }: StockListItemProps) {
    const colorScheme = useColorScheme();
    const iconColor = Colors[colorScheme].itemColor;

    function updateStock(newValue: number) {
        if (newValue == product.stock || newValue == null)
            setNewStock((oldMap) => {
                oldMap.delete(product.id)
                return new Map(oldMap)
            })
        else if (newValue >= 0) {
            setNewStock((oldMap) => new Map(oldMap?.set(product.id, (newValue || 0))))
        }
        console.log(newStock)
    }

    const stockValueInState = newStock.get(product.id);
    const defaultItemBg: string = Colors[colorScheme].itemColor;
    var bgColor = defaultItemBg;

    if (stockValueInState !== undefined) {
        if (stockValueInState == product.stock)
            bgColor = defaultItemBg;
        if (stockValueInState > product.stock)
            bgColor = Colors.lightPrimary

        if (stockValueInState < product.stock)
            bgColor = Colors.lightGray
    }
    else
        bgColor = defaultItemBg

    return (
        <View style={[itemStyles.item, { backgroundColor: bgColor }]}>

            <Text style={itemStyles.name}>
                {product.name_product}
            </Text>
            {editMode ?
                <View style={{ flexDirection: 'row', }} >
                    <View style={{ position: 'relative', flexDirection: 'row', marginLeft: 'auto', alignItems: 'center' }}>
                        {
                            stockValueInState !== undefined &&
                            <Text
                                style={[itemStyles.diff, { color: Colors[colorScheme].itemColor }]}
                            >{(stockValueInState) - product.stock}</Text>
                        }

                        <TouchableOpacity
                            onLongPress={() => {
                                setModal({ showModal: true, options: { productId: product.id, type: 'sub', initialStock: product.stock } })
                            }}
                            onPress={() => {
                                var newStockValue = product.stock - 1
                                if (stockValueInState != null)
                                    newStockValue = stockValueInState - 1;
                                updateStock(newStockValue)
                            }}
                            disabled={stockValueInState ? stockValueInState == 0 : product.stock == 0}
                            style={[itemStyles.subButton, itemStyles.unitButton]}>
                            <FontAwesome5 name='minus' color={iconColor} />
                        </TouchableOpacity>


                        <TextInput
                            cursorColor={Colors.primary}
                            keyboardType='number-pad'
                            style={[itemStyles.stock, { backgroundColor: Colors[colorScheme].background }]}
                            defaultValue={product.stock.toString()}
                            onChangeText={(e) => {
                                const newValue = parseInt(e) || 0
                                console.log(newValue)
                                updateStock(newValue)
                            }}

                            value={newStock.get(product.id)?.toString()}

                        />

                        <TouchableOpacity
                            onLongPress={() => {
                                setModal({ showModal: true, options: { productId: product.id, type: 'add', initialStock: product.stock } })

                            }}
                            onPress={() => {
                                var newStockValue = product.stock + 1
                                if (stockValueInState != null)
                                    newStockValue = stockValueInState + 1;
                                updateStock(newStockValue)
                            }} style={[itemStyles.addButton, itemStyles.unitButton]}
                        >

                            <FontAwesome5 name='plus' color={iconColor} />
                        </TouchableOpacity>

                    </View>
                </View>
                :
                <Text style={[itemStyles.stock]}>{product.stock}</Text>
            }
        </View >
    )
}

const itemStyles = StyleSheet.create({
    item: {
        marginTop: 8,
        borderRadius: 4,
        flexDirection: "row",
        position: "relative",
        overflow: "hidden",
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 8
    },
    name: {
        color: Colors.gray,
        fontSize: 16,
        // margin: 8,
        marginVertical: 12,
        width: '50%',

    },
    stock: {
        fontWeight: '700',
        color: Colors.primary,
        alignSelf: 'center',
        width: 50,
        textAlign: 'right',
        marginHorizontal: 4,
        paddingHorizontal: 8,
        textAlignVertical: 'center'
    },
    diff: {
        fontWeight: 'bold',
        fontSize: 16,
        marginRight: 8,
    },
    unitButton: {
        // width: 50,
        height: 32,

        aspectRatio: 1 / 1,
        alignItems: 'center',
        justifyContent: 'center',
        // flex: 1,
        borderRadius: 4,

    },
    addButton: {
        backgroundColor: Colors.primary,
    },
    subButton: {
        backgroundColor: Colors.gray,
    }
})
