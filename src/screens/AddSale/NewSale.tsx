import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, ActivityIndicator, Switch, Button, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import useColorScheme from '../../hooks/useColorScheme';

import { ProductProps } from '../../@types/product';

import Colors from '../../constants/Colors';

import { BackButton, ButtonsContainer, CancelButton, ContinueButton } from '../../components/common/Buttons';
import { PriceModelSelect } from '../../components/AddSales/PriceModelSelect';
import { ProductsTypeList, ProductTypeListMemo } from '../../components/AddSales/ProductsTypeList';

import { useStock } from '../../contexts/stock';
import { useOrderProducts } from '../../contexts/order';
import { useProducts } from '../../contexts/products';
import { TotalValue } from '../../components/AddSales/TotalValue';
import { ModalSale } from '../../components/AddSales/ModalAddSales';


export function NewSale() {
    const navigation = useNavigation();

    const colorScheme = useColorScheme();

    //CONTEXTS
    const { orderProducts, clearOrderProducts } = useOrderProducts();
    const { productsGroupedByType: productsFromContext, isLoading } = useProducts();
    const { stock } = useStock();

    const [productsGroupedByType, setProductsGroupedByType] = useState<{ [type: string]: [] }>(productsFromContext)
    const [hideNoStockProducts, setHideNoStockProducts] = useState(true);

    const [category, setCategory] = useState('');
    const [modal, setModal] = useState({} as {
        showModal: boolean;
        options: {
            product: ProductProps;
            type: 'add' | 'sub';
            initialCount?: number;
        };
    })
    useEffect(() => {
        const noOneStock = stock.every(item => item.quantity === 0)
        if (noOneStock) {
            setHideNoStockProducts(false)
        }
    }, [])

    useEffect(() => {
        if (hideNoStockProducts) {
            let newProductsGrouped;
            // Object.keys( productsFromContext ).map( type => {
            //     return productsFromContext[ type as string ].filter(product => {
            //         const productStock = stock.find(item => item.id_product == product.id_product);
            //         return productStock?.quantity as number > 0;
            //     })
            // })
            // setProductsGroupedByType(
            // )

        } else {
            setProductsGroupedByType(productsFromContext)
        }
    }, [hideNoStockProducts, productsFromContext, stock])


    return (
        <View style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
            {
                isLoading ?
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator size={32} />
                    </View>
                    :
                    <View style={{}}>
                        {
                            Object.keys( productsFromContext ).length ?
                                <>
                                    {/* OPTIONS */}
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginVertical: 4 }}>
                                        <PriceModelSelect />
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 8 }}>
                                            <Text style={{ color: Colors[colorScheme].text }}>Ocultar produtos {'\n'}sem estoque</Text>
                                            <Switch
                                                trackColor={{ false: Colors.gray, true: Colors.primary }}
                                                thumbColor={Colors[colorScheme].itemColor}
                                                ios_backgroundColor={Colors.gray}
                                                onValueChange={() => setHideNoStockProducts(!hideNoStockProducts)}
                                                value={hideNoStockProducts}
                                            />
                                        </View>
                                    </View>
                                    {
                                        !!category ?
                                        <ProductTypeListMemo productsType={category} setOrderModal={setModal} setCategory={setCategory} productsArr={ productsGroupedByType[category] } key={ category } />
                                        :
                                        <></>
                                    }
                                        <ScrollView
                                            scrollEnabled
                                            contentContainerStyle={{ paddingBottom: 180 }}
                                        >
                                            <View
                                                style={
                                                    {
                                                        position: "relative",
                                                        paddingTop: 16,
                                                        display: "flex",
                                                        gap: 8,
                                                        width: "100%",
                                                        flexWrap: "wrap",
                                                        flexDirection: "row",
                                                        paddingBottom: 48
                                                    }
                                                }
                                            >
                                            {
                                                Object.keys( productsGroupedByType ).map( category => {
                                                    return (
                                                        <TouchableOpacity
                                                            style={{ 
                                                                backgroundColor: Colors[colorScheme].itemColor,
                                                                flexDirection: 'column',
                                                                flexWrap: 'wrap',
                                                                height: 120,
                                                                flexBasis: "40%",
                                                                maxWidth: "50%",
                                                                flexShrink: 1,
                                                                flexGrow: 1,
                                                                aspectRatio: 7 / 5,
                                                                borderRadius: 8,
                                                                padding: 8,
                                                                overflow: 'hidden'
                                                            }}
                                                            onPress={() => setCategory(category) }>
                                                                <Text style={{fontSize: 24, flex: 1, flexWrap: 'wrap', width: "100%"}} >{category}</Text>
                                                        </TouchableOpacity>
                                                    ) 
                                                })
                                            }
                                            </View>
                                        </ScrollView>

                                </>
                                :
                                <View style={{ justifyContent: 'center', flexBasis: '100%' }}>
                                    <Text style={{ textAlign: 'center' }}>Nenhum produto encontrado!</Text>
                                    <Button title='Adicione algum produto' onPress={() => navigation.navigate('ProductForm', {})} />
                                </View>
                        }
                    </View>

            }
            {
                Object.keys( modal ).length ?
                <ModalSale setModal={setModal} modal={modal} />
                :
                <></>
            }
            <ButtonsContainer>
                <TotalValue />
                {
                    //se há algum produto adicionado no pedido, é exibido o botão de cancelar para resetar o pedido
                    orderProducts.length ?
                        <CancelButton onPress={clearOrderProducts} />
                        :
                        <BackButton />
                    //e se não há produtos no pedido, o botão de continuar é desativado
                }
                <ContinueButton
                    disabled={!orderProducts.length}
                    onPress={() => {
                        navigation.navigate('Summary')
                    }}
                />
            </ButtonsContainer>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 8,
    },
    subTitle: {
        fontSize: 24,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: Colors.gray,
    }
});
