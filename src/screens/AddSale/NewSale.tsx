import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, ActivityIndicator, Switch, Button, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import useColorScheme from '../../hooks/useColorScheme';

import { ProductProps } from '../../@types/product';

import Colors from '../../constants/Colors';

import { BackButton, ButtonsContainer, CancelButton, ContinueButton } from '../../components/common/Buttons';
import { PriceModelSelect } from '../../components/AddSales/PriceModelSelect';
import { ItemMemo, ProductsTypeList, ProductTypeListMemo } from '../../components/AddSales/ProductsTypeList';

import { useStock } from '../../contexts/stock';
import { useOrderProducts } from '../../contexts/order';
import { useProducts } from '../../contexts/products';
import { TotalValue } from '../../components/AddSales/TotalValue';
import { ModalSale } from '../../components/AddSales/ModalAddSales';
import { InputField } from '../../components/auth/TextInput';
import { TextInput } from 'react-native-gesture-handler';


export function NewSale() {
    const navigation = useNavigation();

    const colorScheme = useColorScheme();

    //CONTEXTS
    const { addProductToOrder, priceModel, orderProducts, clearOrderProducts } = useOrderProducts();
    const { productsGroupedByType: productsFromContext, isLoading, topProducts } = useProducts();
    const { stock, stockMap } = useStock();

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
                                        {/* <TextInput style={{ paddingVertical: 4, paddingHorizontal: 16, backgroundColor: Colors[colorScheme].itemColor, borderRadius: 80, marginBottom: 4 }} /> */}
                                        <ScrollView
                                            scrollEnabled
                                            contentContainerStyle={{ paddingBottom: 180 }}
                                        >
                                            <View
                                                style={{ borderRadius: 8, backgroundColor: Colors.lightPrimary, padding: 8, paddingBottom: 16 }}
                                            >
                                                <Text style={{ fontSize: 24, color: Colors[colorScheme].text }}>Mais vendidos</Text>
                                                <ScrollView horizontal snapToEnd contentContainerStyle={{ gap: 8 }}>
                                                    {
                                                        topProducts.map(product => {
                                                            let productData = product as any;
                                                            const orderItem = orderProducts.find(item => item.id_product == productData.id_product)
                                                            console.log( productData );
                                                            const productCount = (orderItem?.count) || 0;
                                                            const stockValue = stockMap.get(productData.id_product) || 0;
                                                            return <>
                                                            <ItemMemo key={productData.id_product} stockValue={stockValue} setOrderModal={() => {}} addProductToOrder={addProductToOrder} priceModel={priceModel} productCount={productCount} product={product} />
                                                            </>
                                                        })
                                                    }
                                                </ScrollView>
                                            </View>
                                            
                                            <Text style={{ marginTop: 16, fontSize: 24 }}>Categorias</Text>
                                            <View
                                                style={
                                                    {
                                                        position: "relative",
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
                                                            key={category}
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
