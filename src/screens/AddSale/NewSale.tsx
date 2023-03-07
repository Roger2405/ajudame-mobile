import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, ActivityIndicator, Switch, Button } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import useColorScheme from '../../hooks/useColorScheme';

import { ProductProps } from '../../@types/product';

import Colors from '../../constants/Colors';

import { BackButton, ButtonsContainer, CancelButton, ContinueButton } from '../../components/common/Buttons';
import { PriceModelSelect } from '../../components/AddSales/PriceModelSelect';
import { ProductsTypeList } from '../../components/AddSales/ProductsTypeList';
import { ModalSale } from '../../components/AddSales/AddSaleModal';

import { useStock } from '../../contexts/stock';
import { useOrderProducts } from '../../contexts/order';
import { useProducts } from '../../contexts/products';


export function NewSale() {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();

    //CONTEXTS
    const { orderProducts, clearOrderProducts } = useOrderProducts();
    const { productsGroupedByType: productsFromContext, isLoading } = useProducts();
    const { stock } = useStock();

    const [productsGroupedByType, setProductsGroupedByType] = useState<ProductProps[][]>(productsFromContext)
    const [hideNoStockProducts, setHideNoStockProducts] = useState(true);

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
    console.log('---------------------------------------------')

    useEffect(() => {
        if (hideNoStockProducts)
            setProductsGroupedByType(
                productsFromContext?.map((group, index) => {
                    return group.filter(product => {
                        const productStock = stock.find(item => item.id_product == product.id);
                        return productStock?.quantity as number > 0;
                    })
                })
            )
        else {
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
                    <View>
                        {
                            productsFromContext.length ?
                                <>
                                    {
                                        modal.showModal &&
                                        <ModalSale setModal={setModal} modal={modal} />
                                    }
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
                                    <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
                                        {
                                            productsGroupedByType?.map(type => {
                                                if (type.length)
                                                    return <ProductsTypeList orderProducts={orderProducts} productsArr={type} key={type[0].type_product} />
                                            })
                                        }
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
            <ButtonsContainer>
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
