import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { OrderProduct } from '../components/AddSales/OrderProduct';
import { ProductsGrid } from '../components/AddSales/ProductsGrid';
import { Buttons } from '../components/Buttons';
import OrderProducts from '../components/OrderProducts';
import Colors from '../constants/Colors';
import { RootTabParamList, RootStackParamList } from '../types';
import { OrderProductProps } from '../types/orderProduct';
import { ProductProps } from '../types/product';



export function AddSales() {
    const navigation = useNavigation();
    const [orderProducts, setOrderProducts] = useState<OrderProductProps[]>([]);

    const [errorMessage, setErrorMessage] = useState<string>();
    //const [inputValue, setInputValue] = useState<string>('');
    const [total, setTotal] = useState<number>();
    const [arrFiltered, setArrFiltered] = useState<ProductProps[][]>([]);
    const [completedOrder, setCompletedOrder] = useState(false);

    const [showUnavaliableProducts, setShowUnavaliableProducts] = useState<boolean>(true);
    const [overflowX, setOverflowX] = useState(true);
    const [priceModel, setPriceModel] = useState('main');



    const [stringify, setStringify] = useState('')

    useEffect(() => {
        const groupedProducts = getProducts().then(res =>
            groupProducts(res))
    }, [])

    async function getProducts() {
        // if (!idUser) {
        //     alert("Usuário não está logado");
        //     return [];
        // }
        // else {
        const arrProducts: ProductProps[] = await axios.get(`https://server-ajudame.vercel.app/114/products`)
            .then((response) => {
                if (response.data[0]) {
                    setStringify(JSON.stringify(response.data[0]))
                    return response.data;
                }
                else {
                    throw Error(response.data.msg);
                }
            })
        return arrProducts;
        // }
    }
    function groupProducts(arrProducts: ProductProps[]) {
        let arrayProductsGrouped: ProductProps[][] = [];
        let productsTypes: string[] = [];
        arrProducts.forEach(product => {
            if (productsTypes.includes(product.type_product)) {
                return;
            }
            else {
                productsTypes.push(product.type_product);
            }
        });
        for (var i = 0; i < productsTypes.length; i++) {
            let arr = arrProducts.filter(product => product.type_product === productsTypes[i]);
            arrayProductsGrouped.push(arr);

            if (i > 50) {//watch dog
                break;
            }
        }
        setArrFiltered(arrayProductsGrouped);


    }




    return (
        <View style={{ height: '100%' }}>
            <Text>Adicionar venda</Text>
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
            <Buttons leftButtonColor={Colors.gray} rightButtonColor={Colors.primary} navigation={navigation} />
        </View >
    );
}