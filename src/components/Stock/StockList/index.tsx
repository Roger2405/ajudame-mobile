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
}
export function StockList({ products, editMode }: ProductListProps) {
    const [newStock, setNewStock] = useState<Map<number, number>>(new Map());
    return (
        <View style={[listStyles.container]}>
            <Text style={[listStyles.title, { color: Colors.gray }]}>{products[0].type_product}</Text>
            <FlatList
                data={products}
                renderItem={(product) => <StockListItem product={product.item} newStock={newStock} setNewStock={setNewStock} editMode={editMode} />}
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

}
function StockListItem({ product, editMode, setNewStock, newStock }: StockListItemProps) {
    const colorScheme = useColorScheme();
    const iconColor = Colors[colorScheme].itemColor;

    function updateStock(newValue: number) {
        if (newValue == product.stock || newValue == null)
            setNewStock((oldMap) => {
                oldMap.delete(product.id)
                return new Map(oldMap)
            })
        if (newValue >= 0) {
            // setNewStock(oldValue => oldValue?.set(product.id, (newValue || 0)))
            setNewStock((oldMap) => new Map(oldMap?.set(product.id, (newValue || 0))))
            console.log(newStock)
        }
    }

    const stockValueInState = newStock.get(product.id);
    const defaultItemBg: string = Colors[colorScheme].itemColor;
    var bgColor = defaultItemBg;

    if (stockValueInState !== undefined) {
        if (stockValueInState == product.stock)
            bgColor = defaultItemBg;
        if (stockValueInState > product.stock)
            bgColor = Colors.primaryLight
        if (stockValueInState < product.stock)
            bgColor = Colors.grayLight
    }
    else {
        bgColor = defaultItemBg
    }

    // (stockValueInState !== null ? stockValueInState === product.stock ? defaultItemBg :
    //     stockValueInState !== null ? stockValueInState > product.stock ? Colors.primaryLight :
    //     stockValueInState !== null ? stockValueInState < product.stock ? Colors.grayLight)) : defaultItemBg;
    return (
        <View style={[itemStyles.item, { backgroundColor: bgColor }]}>
            <Text style={[itemStyles.name, { color: Colors.gray }]}>{product.name_product}</Text>
            {editMode ?
                <View style={{ flexDirection: 'row', }} >
                    <View style={{ position: 'relative', flexDirection: 'row', marginLeft: 'auto', alignItems: 'center' }}>

                        <TouchableOpacity onPress={() => {
                            var newStockValue = product.stock - 1
                            if (stockValueInState != null)
                                newStockValue = stockValueInState - 1;
                            updateStock(newStockValue)
                        }} style={[itemStyles.subButton, itemStyles.unitButton]}>
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

                        <TouchableOpacity onPress={() => {
                            var newStockValue = product.stock + 1
                            if (stockValueInState != null)
                                newStockValue = stockValueInState + 1;
                            updateStock(newStockValue)
                        }} style={[itemStyles.addButton, itemStyles.unitButton]}>
                            <FontAwesome5 name='plus' color={iconColor} />
                        </TouchableOpacity>

                        {/* <Text style={{ position: 'absolute', backgroundColor: 'blue', top: 0, right: 0 }}>TESTE</Text> */}
                    </View>
                    <TouchableHighlight style={[itemStyles.editButton, { backgroundColor: Colors.primary }]}>
                        <FontAwesome5 size={24} name={'plus'} color={iconColor} />
                    </TouchableHighlight>
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
    },
    editButton: {
        width: 40,
        marginLeft: 8,
        display: 'none',
        alignSelf: 'center',
        aspectRatio: 1 / 1,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
    }
})
