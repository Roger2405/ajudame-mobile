import { styles } from './styles';

import React, { memo, useEffect, useState } from 'react';
import { View, Image, Text, FlatList, Pressable, TouchableOpacity, ScrollView } from 'react-native';

import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
//TYPES
import { ProductProps } from '../../../@types/product';
//CONTEXTS
import { useOrderProducts } from '../../../contexts/order';
import { useStock } from '../../../contexts/stock';

import api from '../../../services/api';
import { OrderProductProps } from '../../../@types/orderProduct';
import { StockProps } from '../../../@types/stock';

interface Props {
    productsArr: ProductProps[]
    // setModal: React.Dispatch<React.SetStateAction<{
    //     showModal: boolean;
    //     options: {
    //         product: ProductProps;
    //         type: 'add' | 'sub';
    //         initialCount?: number;
    //     };
    // }>>,
    orderProducts: OrderProductProps[]
}
export const ProductTypeListMemo = memo(ProductsTypeList)

export function ProductsTypeList({ productsArr, orderProducts }: Props) {
    const colorScheme = useColorScheme();

    return (
        <View>
            <Text style={{ fontWeight: '700', fontSize: 24, color: Colors[colorScheme].text }}>{productsArr[0].type_product}</Text>
            <ScrollView
                horizontal
                style={styles.grid}
            >
                <ItensMemo orderProducts={orderProducts} productsArr={productsArr} />
            </ScrollView>
        </View>
    );
}

const ItensMemo = memo(Itens)
function Itens({ productsArr, orderProducts }: Props) {
    return (
        <>
            {
                productsArr.map(product => {
                    const orderItem = orderProducts.find(item => item.id == product.id)
                    var productCount = (orderItem?.count) || 0;
                    return <Item key={product.id} productCount={productCount} product={product} />
                })
            }
        </>
    )
}

const Item = memo(ProductItem);

interface ItemProps {
    product: ProductProps
    // setModal: React.Dispatch<React.SetStateAction<{
    //     showModal: boolean;
    //     options: {
    //         product: ProductProps;
    //         type: 'add' | 'sub';
    //         initialCount?: number;
    //     };
    // }>>
    productCount: number
}

function ProductItem({ product, productCount }: ItemProps) {
    const { addProductToOrder, priceModel } = useOrderProducts();
    const { stockMap } = useStock();
    const colorScheme = useColorScheme();

    //definindo cores
    var bgItemColor = Colors[colorScheme].itemColor;
    var bgItemPriceColor = priceModel == 'main_price' ? Colors.primary : Colors.gray;
    var priceColor = Colors[colorScheme].textContrast;
    var nameColor = Colors[colorScheme].text;

    console.log(productCount)

    if (productCount > 0) {
        bgItemColor = priceModel == 'main_price' ? Colors.primary : Colors.gray;
        bgItemPriceColor = Colors.white;
        priceColor = priceModel == 'main_price' ? Colors.primary : Colors.gray;
    }
    //se o produto está no pedido outras cores são exibidas
    //valores

    //se o modelo de preço selecionado for o principal, é exibido o main_price, caso contrário, é exibido o preço secundário
    var price_product = (product[priceModel] || 0);
    const priceProductFormatted = price_product.toFixed(2).replace('.', ',')
    var image_url = `${api.defaults.baseURL}${product.image_path}`;

    // var objectStockFromContext = stock.find(item => item.id === product.id);
    // var stockValue = objectStockFromContext?.quantity;

    const stockValue = stockMap.get(product.id);

    return (
        <Pressable
            style={({ pressed }) => [
                {
                    backgroundColor: pressed ? Colors[colorScheme].background : bgItemColor,
                    // display: hideProduct ? 'none' : 'flex'
                }, styles.item]}
            key={product.id}
            // onLongPress={() => {
            //     setModal({ options: { product: product, type: 'add' }, showModal: true })
            // }}
            delayLongPress={250}
            onPress={() => {
                addProductToOrder(product)
            }}>

            <View style={styles.itemHeader}>
                <Text style={[styles.itemName, { color: nameColor }]}>{product.name_product}</Text>
                {
                    productCount > 0 &&
                    <Text style={styles.itemCount}>{productCount}</Text>
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
                    {
                        price_product > 0 &&
                        <Text style={[styles.itemPrice, { backgroundColor: bgItemPriceColor, color: priceColor }]}>
                            R$ {priceProductFormatted}
                        </Text>
                    }
                </View>


            </View>
        </Pressable >
    )
}
// React.memo(ProductItem);

