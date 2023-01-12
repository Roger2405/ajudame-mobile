import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { ProductsGrid } from '../components/AddSales/ProductsGrid';
import OrderProducts from '../components/common/OrderProducts';
import Colors from '../constants/Colors';
import { OrderProductProps } from '../@types/orderProduct';
import { ProductProps } from '../@types/product';
import { BackButton, ButtonsContainer, CancelButton, ContinueButton } from '../components/common/Buttons';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useColorScheme from '../hooks/useColorScheme';
import { getGroupedProducts } from '../services/products';
import OrderCard from '../components/AddSales/OrderCard';

// import { SwipeablePanel } from 'r';

//SWIPE UP ORDER PRODUCTS
export function AddSales() {
    var initialOrderProducts: OrderProductProps[] = [];
    AsyncStorage.getItem('orderProducts').then(str => {
        if (str) {
            initialOrderProducts = JSON.parse(str);
        }
    })
    const navigation = useNavigation();
    const [orderProducts, setOrderProducts] = useState<OrderProductProps[]>(initialOrderProducts);

    const [errorMessage, setErrorMessage] = useState<string>();
    //const [inputValue, setInputValue] = useState<string>('');
    const [total, setTotal] = useState<number>();
    const [arrFiltered, setArrFiltered] = useState<ProductProps[][]>([]);
    const [completedOrder, setCompletedOrder] = useState(false);

    const [showUnavaliableProducts, setShowUnavaliableProducts] = useState<boolean>(true);
    const [overflowX, setOverflowX] = useState(true);
    const [priceModel, setPriceModel] = useState('main');

    const colorScheme = useColorScheme();

    useEffect(() => {
        getGroupedProducts().then(setArrFiltered)
    }, [])
    return (
        <View style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
            <FlatList
                style={{
                    flexBasis: '100%',
                    flexGrow: 0,
                    flexShrink: 0
                }}
                contentContainerStyle={{ paddingBottom: 300 }}
                data={arrFiltered}
                renderItem={productsByType => <ProductsGrid setOrderProducts={setOrderProducts} orderProducts={orderProducts} productsArr={productsByType.item} key={productsByType.item[0].type_product} />}
            />
            {
                <OrderCard orderProducts={orderProducts} setOrderProducts={setOrderProducts} />
            }
            {/* <View style={{ flexBasis: '40%' }}>
                <Text style={styles.subTitle}>Pedido</Text>
                <OrderProducts sales={orderProducts} editable setOrderProducts={setOrderProducts} />
            </View> */}
            <ButtonsContainer>
                {//se há algum produto adicionado no pedido, é exibido o botão de cancelar para resetar o pedido
                    orderProducts.length ? <CancelButton onPress={() => setOrderProducts([])} /> : <BackButton />
                /*e se não há produtos no pedido, o botão de continuar é desativado*/}
                <ContinueButton disabled={!orderProducts.length} onPress={() => {
                    AsyncStorage.setItem('orderProducts', JSON.stringify(orderProducts))
                    navigation.navigate('Summary', orderProducts)
                }} />
            </ButtonsContainer>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 8,
    },
    subTitle: {
        fontSize: 24,
        // textAlign: 'right',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: Colors.gray,
    }
});
