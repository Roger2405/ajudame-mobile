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
            bgColor = Colors.primaryLight

        if (stockValueInState < product.stock)
            bgColor = Colors.grayLight
    }
    else
        bgColor = defaultItemBg

    return (
        <View style={[itemStyles.item, { backgroundColor: bgColor }]}>
            {/* <StockModal idProductToUpdate={idProductToUpdate} setIdProductToUpdate={setIdProductToUpdate} /> */}

            <Text style={[itemStyles.name, { color: Colors.gray }]}>{product.name_product}</Text>
            {editMode ?
                <View style={{ flexDirection: 'row', }} >
                    <View style={{ position: 'relative', flexDirection: 'row', marginLeft: 'auto', alignItems: 'center' }}>
                        {
                            stockValueInState !== undefined &&
                            <Text style={[itemStyles.diff, { color: Colors[colorScheme].itemColor }]}>{(stockValueInState) - product.stock}</Text>
                        }

                        <TouchableOpacity
                            onLongPress={() => {
                                // setIdProductToUpdate(product.id)
                                setModal({ showModal: true, options: { productId: product.id, type: 'sub', initialStock: product.stock } })
                                // setStockModalId(product.id)
                            }}
                            onPress={() => {
                                var newStockValue = product.stock - 1
                                if (stockValueInState != null)
                                    newStockValue = stockValueInState - 1;
                                updateStock(newStockValue)
                            }}
                            disabled={stockValueInState == 0 || product.stock == 0}
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
/*
interface StockModalProps {
    setIdProductToUpdate: React.Dispatch<React.SetStateAction<number>>
    idProductToUpdate: number
}

function StockModal({ setIdProductToUpdate, idProductToUpdate }: StockModalProps) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={!!idProductToUpdate}
            onRequestClose={() => {
                setIdProductToUpdate(0);
            }}
        >
            <View
                style={modalStyles.centeredView}>
                <View
                    style={modalStyles.modalView}>
                    <Text
                        style={{
                            textAlign: 'center',
                            width: '100%',
                            fontSize: 24,
                            color: Colors.gray
                        }}
                    >Subtrair estoque</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            // backgroundColor: Colors.grayLight,
                            borderRadius: 8,
                            borderColor: Colors.grayLight,
                            borderWidth: 2,
                            width: '100%',
                            padding: 4
                        }}>
                        <Text
                            style={{
                                color: Colors.gray
                            }}>Quantidade: </Text>
                        <TextInput
                            placeholder='quantidade a ser subtraída'
                            placeholderTextColor={Colors.grayLight}
                            cursorColor={Colors.primary}
                            keyboardType={'number-pad'}
                            style={{
                                backgroundColor: Colors.grayLight,
                                padding: 8,
                                borderRadius: 4,

                            }}
                        />
                    </View>
                    <ButtonsContainer>
                        <CancelButton
                            onPress={() => {
                                setIdProductToUpdate(0)
                            }}
                        />
                        <ConfirmButton
                            onPress={() => {
                                setIdProductToUpdate(0)
                            }}
                        />
                    </ButtonsContainer>
                </View>
            </View>
        </Modal>
    )
}

const modalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22,
        margin: 20,
    },
    modalView: {
        width: '100%',
        padding: 8,
        backgroundColor: "white",
        borderRadius: 8,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
})
*/
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
