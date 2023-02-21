import { styles } from './styles';

import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';

import Animated, { Layout, FadeOutUp } from 'react-native-reanimated';
//ICONS
import { Feather } from '@expo/vector-icons';
//CORES E TEMA
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';

import { OrderProductProps } from '../../../@types/orderProduct';

import { useOrderProducts } from '../../../contexts/order';


export default function OrderProducts() {
    const { orderProducts } = useOrderProducts();
    return (
        <ScrollView style={styles.container}>
            {
                orderProducts.map(sale => {
                    return <Item key={sale.id_product} item={sale} />
                })
            }
        </ScrollView>
    )
}

interface ItemProps {
    item: OrderProductProps
}
export function Item({ item }: ItemProps) {
    const colorScheme = useColorScheme();
    const { subProductOfOrder, addCountToOrderProduct, priceModel } = useOrderProducts();
    
    const price_product = priceModel === 'main' ? item.main_price : item.secondary_price;
    const subtotal = ((price_product * item.count).toFixed(2).replace('.', ',') || 0);
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
                        onPress={() => subProductOfOrder(item.id_product)}
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