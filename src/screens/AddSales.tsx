import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ProductsGrid } from '../components/AddSales/ProductsGrid';
import OrderProducts from '../components/common/OrderProducts';
import Colors from '../constants/Colors';
import { OrderProductProps } from '../@types/orderProduct';
import { ProductProps } from '../@types/product';
import { DualButtons } from '../components/common/Buttons';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useColorScheme from '../hooks/useColorScheme';
import { getGroupedProducts } from '../services/products';


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
            <Text style={styles.title}>Adicionar venda</Text>
            <FlatList
                style={{
                    flexBasis: '60%',
                    flexGrow: 0,
                    flexShrink: 0
                }}
                data={arrFiltered}
                renderItem={productsByType => <ProductsGrid setOrderProducts={setOrderProducts} orderProducts={orderProducts} productsArr={productsByType.item} key={productsByType.item[0].type_product} />}
            />

            {/* <FlatList
                    data={orderProducts}
                    renderItem={orderProduct => <OrderProduct orderProduct={orderProduct.item} />}

                /> */}
            <View style={{ flexBasis: '40%' }}>
                <OrderProducts sales={orderProducts} editable setOrderProducts={setOrderProducts} />
            </View>
            <DualButtons title='Continuar' onPress={() => {
                AsyncStorage.setItem('orderProducts', JSON.stringify(orderProducts))
                navigation.navigate('Summary', orderProducts)
            }} color={Colors.primary}
                iconName="angle-right"
            />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
