import { styles } from './styles';

import React, { memo, useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';

import Animated, { Layout, FadeOutUp } from 'react-native-reanimated';
//ICONS
import { Feather } from '@expo/vector-icons';
//CORES E TEMA
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';

import { OrderProductProps } from '../../../@types/orderProduct';

import { useOrderProducts } from '../../../contexts/order';
import { PriceModels } from '../../../@types/sales';


export default function OrderProducts() {
    const orderProductsContext = useOrderProducts();

    return (
        <ScrollView style={styles.container}>
            {
                orderProductsContext.orderProducts.map(item => {
                    const itemProp = item;
                    return <Item key={item.id} item={itemProp} {...orderProductsContext} />
                })
            }
        </ScrollView>
    )
}



interface ItemProps {
    item: OrderProductProps
    addCountToOrderProduct: (orderProduct: OrderProductProps) => void,
    subProductOfOrder: (id: number) => void,
    priceModel: PriceModels,
}
function Item({ item, priceModel, addCountToOrderProduct, subProductOfOrder }: ItemProps) {
    const colorScheme = useColorScheme();

    const price_product = item[priceModel];
    const subtotal = (((price_product || 0) * item.count).toFixed(2).replace('.', ',') || 0);
    const price = (price_product)?.toFixed(2).replace('.', ',')
    return (
        <Animated.View
            layout={Layout}
            exiting={FadeOutUp}
        >
            <View style={[{ backgroundColor: price_product === 0 ? Colors.lightGray : Colors[colorScheme].itemColor }, styles.item]}>

                <View style={{ flexGrow: 1, flexBasis: '30%', marginLeft: 4 }}>
                    <Text style={[styles.itemName, styles.text, { color: Colors.gray }]}>{item.name_product}</Text>
                    <Text style={{ color: Colors.lightPrimary, fontWeight: 'bold', fontSize: 12 }}>R$ {price}</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Pressable style={styles.buttonCount}
                        onPress={() => subProductOfOrder(item.id)}
                    ><Feather name='minus' size={24} color={Colors.white} /></Pressable>

                    <Text style={[styles.itemCount, { color: Colors[colorScheme].text }]}>{(item.count.toString())}</Text>

                    <Pressable style={styles.buttonCount}
                        onPress={() => addCountToOrderProduct(item)}
                    ><Feather name='plus' size={24} color={Colors.white} /></Pressable>
                </View>

                <Text style={[styles.text, styles.itemSubtotal]}>R$ {subtotal.toString()}</Text>
            </View>
        </Animated.View >
    );
}