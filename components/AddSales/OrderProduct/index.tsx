import React from 'react';
import { View, Text } from 'react-native';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { OrderProductProps } from '../../../types/orderProduct';

import { styles } from './styles';

interface Props {
    orderProduct: OrderProductProps
}

export function OrderProduct({ orderProduct }: Props) {
    const colorScheme = useColorScheme();

    const { name_product, count, price_product } = orderProduct;
    const subTotal = count * price_product;
    return (
        <View style={[styles.container, { backgroundColor: Colors[colorScheme].itemColor }]}>
            <Text>{name_product}</Text>
            <Text>{count}</Text>
            <Text>{price_product.toFixed(2)}</Text>
            <Text>{subTotal}</Text>
        </View>
    );
}