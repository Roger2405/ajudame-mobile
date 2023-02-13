import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, ActivityIndicator, Switch } from 'react-native';
import { ProductsGrid } from '../../components/AddSales/ProductsGrid';
import Colors from '../../constants/Colors';
import { ProductProps } from '../../@types/product';
import { BackButton, ButtonsContainer, CancelButton, ContinueButton } from '../../components/common/Buttons';
import useColorScheme from '../../hooks/useColorScheme';
import OrderCard from '../../components/AddSales/OrderCard';
import { useProducts } from '../../contexts/products';
import OrderProducts, { Item } from '../../components/AddSales/OrderProducts';
import { ModalSale } from '../../components/AddSales/AddSaleModal';
import { useOrderProducts } from '../../contexts/order';
import { useStock } from '../../contexts/stock';
import { getProduct } from '../../services/products';
import getGroupedArray from '../../utils/groupArray';
import Animated from 'react-native-reanimated';

// import { SwipeablePanel } from 'r';

//SWIPE UP ORDER PRODUCTS
export function NewSale() {
    const navigation = useNavigation();
    // const [orderProducts, setOrderProducts] = useState<OrderProductProps[]>([]);
    const { orderProducts, clearOrderProducts } = useOrderProducts();
    const [modal, setModal] = useState({} as {
        showModal: boolean;
        options: {
            product: ProductProps;
            type: 'add' | 'sub';
            initialCount?: number;
        };
    })

    // const [errorMessage, setErrorMessage] = useState<string>();
    //const [inputValue, setInputValue] = useState<string>('');
    // const [total, setTotal] = useState<number>();
    const { productsGroupedByType } = useProducts();
    const { stock } = useStock();
    const [productsFiltered, setProductsFiltered] = useState<ProductProps[][]>(productsGroupedByType)
    const [hideNoStockProducts, setHideNoStockProducts] = useState(true);
    // const [completedOrder, setCompletedOrder] = useState(false);

    // const [priceModel, setPriceModel] = useState('main');

    useEffect(() => {
        console.log(productsFiltered)
    }, [productsFiltered])
    useEffect(() => {
        if (hideNoStockProducts)
            setProductsFiltered(
                productsGroupedByType?.map((group, index) => {
                    return group.filter(product => {
                        const productStock = stock.find(item => item.id_product == product.id);
                        return productStock?.quantity as number > 0;
                    })
                })
            )
        else {
            setProductsFiltered(productsGroupedByType)
        }
    }, [hideNoStockProducts])

    const colorScheme = useColorScheme();

    return (
        <>
            {
                productsFiltered.length ?
                    <View style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
                        {
                            modal.showModal &&
                            <ModalSale setModal={setModal} modal={modal} />
                        }
                        {/* OPTIONS */}
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text>Ocultar sem estoque</Text>
                                <Switch
                                    trackColor={{ false: Colors.gray, true: Colors.primary }}
                                    thumbColor={Colors[colorScheme].itemColor}
                                    ios_backgroundColor={Colors.gray}
                                    onValueChange={() => setHideNoStockProducts(!hideNoStockProducts)}
                                    value={hideNoStockProducts}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text>Ocultar sem estoque</Text>
                                <Switch
                                    trackColor={{ false: Colors.gray, true: Colors.primary }}
                                    thumbColor={Colors[colorScheme].itemColor}
                                    ios_backgroundColor={Colors.gray}
                                    onValueChange={() => setHideNoStockProducts(!hideNoStockProducts)}
                                    value={hideNoStockProducts}
                                />
                            </View>
                        </View>
                        <ScrollView
                            contentContainerStyle={{
                                paddingBottom: 120
                            }}
                        >
                            {
                                productsFiltered?.map(type => {
                                    if (type.length)
                                        return <ProductsGrid setModal={setModal} productsArr={type} key={type[0].type_product} />
                                })
                            }
                        </ScrollView>
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
                                    navigation.navigate('Summary', orderProducts)
                                }}
                            />
                        </ButtonsContainer>
                    </View >
                    :
                    <ActivityIndicator />
            }
        </>
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
