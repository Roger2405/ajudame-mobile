import React, { useState } from 'react';
import { View, Image, Text, FlatList, TouchableOpacity } from 'react-native';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { OrderProductProps } from '../../../types/orderProduct';
import { ProductProps } from '../../../types/product';

import { styles } from './styles';

interface Props {
    productsArr: ProductProps[]
    setOrderProducts: (value: React.SetStateAction<OrderProductProps[]>) => void
    orderProducts: OrderProductProps[]
}

export function ProductsGrid({ productsArr, setOrderProducts, orderProducts }: Props) {
    return (
        <View>
            <Text style={{ fontWeight: '700', fontSize: 24 }}>{productsArr[0].type_product}</Text>
            <FlatList
                style={styles.grid}
                horizontal
                bounces
                data={productsArr}
                renderItem={product => <ProductCell setOrderProducts={setOrderProducts} key={product.item.name_product} orderProducts={orderProducts} product={product.item} />}
            />
        </View>
    );
}


interface ItemProps {
    product: ProductProps
    setOrderProducts: (value: React.SetStateAction<OrderProductProps[]>) => void
    orderProducts: OrderProductProps[]
}
function ProductCell({ product, setOrderProducts, orderProducts }: ItemProps) {
    const colorScheme = useColorScheme();

    function isInTheOrder() {
        return orderProducts.some(item => item.id_product == product.id)
    }
    function getIndexInOrderProducts() {
        return orderProducts.findIndex(item => item.id_product == product.id)
    }

    //definindo cores
    var bgItemColor = Colors.light.itemColor;
    var bgItemPriceColor = Colors.primary;
    var priceColor = Colors.light.textContrast;
    var nameColor = Colors.light.text;

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
    return (
        <TouchableOpacity onPress={() => _addProductToOrder(setOrderProducts, product)} style={[styles.item, { backgroundColor: bgItemColor }]}>
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
                        <Image resizeMode='contain' style={{ width: '100%', height: '100%' }} source={{ uri: `https://server-ajudame.vercel.app/${product.image_path}` }} />
                    }
                </View>
                <View>

                    <View style={{ margin: 4 }}>
                        <Text style={{ fontSize: 8, color: Colors.gray }}>estoque</Text>
                        <Text style={{ color: Colors.gray, textAlign: 'right' }}>{JSON.stringify(product.stock)}</Text>
                    </View>
                    <Text style={[styles.itemPrice, { backgroundColor: bgItemPriceColor, color: priceColor }]}>
                        R$ {product_price}
                    </Text>
                </View>


            </View>
        </TouchableOpacity>
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
                name_product: product.name_product
            })
        }
        return [...orderProducts]
    })
}