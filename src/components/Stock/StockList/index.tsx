import { Feather, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableHighlight, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { ProductProps } from '../../../@types/product';
import { StockProps } from '../../../@types/stock';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';

import { itemStyles, listStyles } from './styles';

interface ProductListProps {
    arrStock: StockProps[]
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
export function StockList({ arrStock, editMode, setNewStock, newStock, setModal }: ProductListProps) {
    return (
        <View style={[listStyles.container]}>
            <Text style={[listStyles.title]}>{arrStock[0].type_product}</Text>
            <ScrollView>
                {
                    arrStock?.map(item => {
                        return <StockListItem key={item.id_product} setModal={setModal} stock={item} newStock={newStock} setNewStock={setNewStock} editMode={editMode} />
                    })
                }
            </ScrollView>
        </View>
    )
}

interface StockListItemProps {
    stock: StockProps
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
function StockListItem({ stock, editMode, setNewStock, newStock, setModal }: StockListItemProps) {
    const colorScheme = useColorScheme();
    const iconColor = Colors[colorScheme].itemColor;

    function updateStock(newValue: number) {
        if (newValue == stock.quantity || newValue == null)
            setNewStock((oldMap) => {
                oldMap.delete(stock.id_product)
                return new Map(oldMap)
            })
        else if (newValue >= 0) {
            console.log(stock.id_product)
            setNewStock((oldMap) => new Map(oldMap?.set(stock.id_product, (newValue || 0))))
        }
    }

    const stockValueInState = newStock.get(stock.id_product);
    const defaultItemBg: string = Colors[colorScheme].itemColor;
    var bgColor = defaultItemBg;

    if (stockValueInState !== undefined) {
        if (stockValueInState == stock.quantity)
            bgColor = defaultItemBg;
        if (stockValueInState > stock.quantity)
            bgColor = Colors.lightPrimary

        if (stockValueInState < stock.quantity)
            bgColor = Colors.lightGray
    }
    else
        bgColor = defaultItemBg

    return (
        <View style={[itemStyles.item, { backgroundColor: bgColor, opacity: (stock.quantity > 0) ? 1 : .5 }]}>

            <Text style={itemStyles.name}>
                {stock.name_product}
            </Text>
            {editMode ?
                <View style={{ flexDirection: 'row', }} >
                    <View style={{ position: 'relative', flexDirection: 'row', marginLeft: 'auto', alignItems: 'center' }}>
                        {
                            stockValueInState !== undefined &&
                            <Text
                                style={[itemStyles.diff, { color: Colors[colorScheme].itemColor }]}
                            >{(stockValueInState) - stock.quantity}</Text>
                        }

                        <TouchableOpacity
                            onLongPress={() => {
                                setModal({ showModal: true, options: { productId: stock.id_product, type: 'sub', initialStock: stock.quantity } })
                            }}
                            onPress={() => {
                                var newStockValue = stock.quantity - 1
                                if (stockValueInState != null)
                                    newStockValue = stockValueInState - 1;
                                updateStock(newStockValue)
                            }}
                            disabled={stockValueInState ? stockValueInState == 0 : stock.quantity == 0}
                            style={[itemStyles.subButton, itemStyles.unitButton]}>
                            <FontAwesome5 name='minus' color={iconColor} />
                        </TouchableOpacity>


                        <TextInput
                            cursorColor={Colors.primary}
                            keyboardType='number-pad'
                            style={[itemStyles.stock, { backgroundColor: Colors[colorScheme].background }]}
                            defaultValue={stock.quantity.toString()}
                            onChangeText={(e) => {
                                const newValue = parseInt(e) || 0
                                updateStock(newValue)
                            }}

                            value={newStock.get(stock.id_product)?.toString()}

                        />

                        <TouchableOpacity
                            onLongPress={() => {
                                setModal({ showModal: true, options: { productId: stock.id_product, type: 'add', initialStock: stock.quantity } })

                            }}
                            onPress={() => {
                                var newStockValue = stock.quantity + 1
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
                <Text style={[itemStyles.stock]}>{stockValueInState || stock.quantity}</Text>
            }
        </View >
    )
}
/*
const itemStyles = StyleSheet.create({
    item: {
        marginTop: 4,
        textAlignVertical: 'center',
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
        fontWeight: 'bold',
        color: Colors.primary,
        alignSelf: 'center',
        width: 60,
        textAlign: 'right',
        fontSize: 18,
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
        height: 32,

        aspectRatio: 1 / 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,

    },
    addButton: {
        backgroundColor: Colors.primary,
    },
    subButton: {
        backgroundColor: Colors.gray,
    }
})
*/