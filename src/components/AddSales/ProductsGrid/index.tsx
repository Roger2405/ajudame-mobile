import React, { useEffect } from 'react';
import { View, Image, Text, FlatList, Pressable, TouchableOpacity, ScrollView } from 'react-native';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { OrderProductProps } from '../../../@types/orderProduct';
import { ProductProps } from '../../../@types/product';

import { styles } from './styles';
import api from '../../../services/api';
import { useOrderProducts } from '../../../contexts/order';
import { useStock } from '../../../contexts/stock';

interface Props {
    productsArr: ProductProps[]
    setModal: React.Dispatch<React.SetStateAction<{
        showModal: boolean;
        options: {
            product: ProductProps;
            type: 'add' | 'sub';
            initialCount?: number;
        };
    }>>
}

export function ProductsGrid({ productsArr, setModal }: Props) {
    const colorScheme = useColorScheme();
    return (
        <View>
            <Text style={{ fontWeight: '700', fontSize: 24, color: Colors[colorScheme].text }}>{productsArr[0].type_product}</Text>
            {/* <FlatList
                style={styles.grid}
                horizontal
                bounces
                data={productsArr}
                renderItem={product => <ProductCell setModal={setModal} key={product.item.name_product} product={product.item} />}
            /> */}
            <ScrollView
                horizontal
                style={styles.grid}
            >
                {
                    productsArr.map(product => {
                        return <ProductCell setModal={setModal} key={product.id} product={product} />
                    })
                }
            </ScrollView>
        </View>
    );
}


interface ItemProps {
    product: ProductProps
    setModal: React.Dispatch<React.SetStateAction<{
        showModal: boolean;
        options: {
            product: ProductProps;
            type: 'add' | 'sub';
            initialCount?: number;
        };
    }>>
}
function ProductCell({ product, setModal }: ItemProps) {
    const { orderProducts, setOrderProducts } = useOrderProducts();
    const { stock } = useStock();

    const colorScheme = useColorScheme();


    function isInTheOrder() {
        return orderProducts.some(item => item.id_product == product.id)
    }
    function getIndexInOrderProducts() {
        return orderProducts.findIndex(item => item.id_product == product.id)
    }

    //definindo cores
    var bgItemColor = Colors[colorScheme].itemColor;
    var bgItemPriceColor = Colors.primary;
    var priceColor = Colors[colorScheme].textContrast;
    var nameColor = Colors[colorScheme].text;

    //se o produto está no pedido outras cores são exibidas
    const productIsInTheOrder = isInTheOrder();
    if (productIsInTheOrder) {
        bgItemColor = Colors.primary;
        bgItemPriceColor = Colors.light.itemColor;
        priceColor = Colors.primary;
    }
    //valores
    var product_count = orderProducts[getIndexInOrderProducts()]?.count;
    var product_price = product.main_price.toFixed(2);
    var image_url = `${api.defaults.baseURL}${product.image_path}`;
    var objectStockFromContext = stock.find(item => item.id_product == product.id);
    var stockValue = objectStockFromContext?.quantity;
    // const hideProduct = hideNoStockProducts && stockValue == 0;
    return (

        <Pressable
            style={({ pressed }) => [
                {
                    backgroundColor: pressed ? Colors[colorScheme].background : bgItemColor,
                    // display: hideProduct ? 'none' : 'flex'
                }, styles.item]}
            key={product.id}
            onLongPress={() => {
                setModal({ options: { product: product, type: 'add' }, showModal: true })
            }}
            onPress={() => _addProductToOrder(setOrderProducts, product)}>

            <View style={styles.itemHeader}>
                <Text style={[styles.itemName, { color: nameColor }]}>{product.name_product}</Text>
                {
                    product_count &&
                    <Text style={styles.itemCount}>{product_count}</Text>
                }

            </View>
            <View style={styles.itemBody}>
                <View style={styles.itemImage}>
                    {
                        product.image_path &&
                        <Image resizeMode='contain' style={{ width: '100%', height: '100%' }} source={{ uri: image_url }} />
                    }
                </View>
                <View>

                    <View style={{ margin: 4 }}>
                        <Text style={{ fontSize: 8, color: Colors.gray }}>estoque</Text>
                        <Text style={{ color: Colors.gray, textAlign: 'right' }}>{JSON.stringify(stockValue)}</Text>
                    </View>
                    <Text style={[styles.itemPrice, { backgroundColor: bgItemPriceColor, color: priceColor }]}>
                        R$ {product_price}
                    </Text>
                </View>


            </View>
        </Pressable >
    )
}

function _addProductToOrder(setOrderProducts: (value: React.SetStateAction<OrderProductProps[]>) => void, product: ProductProps,) {
    setOrderProducts(orderProducts => {
        const indexOfProduct = orderProducts.findIndex(item => item.id_product == product.id);

        if (indexOfProduct != -1) {//caso encontre um produto já existente no array
            orderProducts[indexOfProduct].count++;
        }
        else {//caso contrário adiciona no final do array
            orderProducts.push({
                id_product: product.id,
                count: 1,
                price_product: product.main_price,
                name_product: product.name_product,
                // cost_product: product.cost
            })
        }
        return [...orderProducts]
    })
}