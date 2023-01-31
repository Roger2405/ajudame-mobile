import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, ScrollView, ActivityIndicator, Switch } from 'react-native';
import { ProductsGrid } from '../../components/AddSales/ProductsGrid';
import Colors from '../../constants/Colors';
import { OrderProductProps } from '../../@types/orderProduct';
import { ProductProps } from '../../@types/product';
import { BackButton, ButtonsContainer, CancelButton, ContinueButton } from '../../components/common/Buttons';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useColorScheme from '../../hooks/useColorScheme';
import { getGroupedProducts } from '../../services/products';
import OrderCard from '../../components/AddSales/OrderCard';
import { useProducts } from '../../contexts/products';
import OrderProducts from '../../components/AddSales/OrderProducts';
import { ModalSale } from '../../components/AddSales/AddSaleModal';
import { useOrderProducts } from '../../contexts/order';
import { useStock } from '../../contexts/stock';

// import { SwipeablePanel } from 'r';

//SWIPE UP ORDER PRODUCTS
export function NewSale() {
    const navigation = useNavigation();
    // const [orderProducts, setOrderProducts] = useState<OrderProductProps[]>([]);
    const { orderProducts, setOrderProducts } = useOrderProducts();
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
    // const [productsGroupedByType, setProductsGroupedByType] = useState<ProductProps[][]>([]);
    // useEffect(() => {
    //     getGroupedProducts().then(setProductsGroupedByType).catch(console.log)
    // }, [])
    const { productsGroupedByType } = useProducts();
    const [products, setProducts] = useState<ProductProps[][] | null>(productsGroupedByType)

    // const [completedOrder, setCompletedOrder] = useState(false);

    // const [overflowX, setOverflowX] = useState(true);
    // const [priceModel, setPriceModel] = useState('main');

    const colorScheme = useColorScheme();
    const { stock } = useStock();

    return (
        <>
            {products?.length ?
                <View style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
                    {
                        modal.showModal &&
                        <ModalSale setModal={setModal} modal={modal} />
                    }
                    {/* 
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text>Ocultar sem estoque</Text>
                        <Switch
                            trackColor={{ false: Colors.gray, true: Colors.primary }}
                            thumbColor={Colors[colorScheme].itemColor}
                            ios_backgroundColor={Colors.gray}
                            onValueChange={() => setHideNoStockProducts(!hideNoStockProducts)}
                            value={hideNoStockProducts}
                        />
                    </View> */}
                    <ScrollView
                        style={{
                            marginBottom: 120
                        }}
                    >
                        {
                            products?.map(type => {
                                return <ProductsGrid setModal={setModal} productsArr={type} key={type[0].type_product} />
                            })
                        }
                    </ScrollView>
                    <OrderCard />
                    <ButtonsContainer>
                        {
                            //se há algum produto adicionado no pedido, é exibido o botão de cancelar para resetar o pedido
                            orderProducts.length ?
                                <CancelButton onPress={() => setOrderProducts([])} />
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
        paddingHorizontal: 8,
    },
    subTitle: {
        fontSize: 24,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: Colors.gray,
    }
});
