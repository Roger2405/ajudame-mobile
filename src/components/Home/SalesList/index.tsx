import React from 'react';
import { View, Text, ListRenderItemInfo, TouchableOpacity, FlatList } from 'react-native';
import { LastSaleProductProps, SaleProductProps } from '../../../@types/orderProduct';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { styles } from './styles';

interface Props {
    sales: SaleProductProps[]
    editable?: boolean
    setOrderProducts?: React.Dispatch<React.SetStateAction<SaleProductProps[]>>
}

export function SalesList({ sales }: Props) {
    return (
        <View>
            {
                sales.length &&
                sales.map(item => {
                    return <SalesListItem item={item} key={item.id} />
                })
            }
        </View>
    )
}

interface ItemProps {
    item: SaleProductProps
}

export function SalesListItem({ item }: ItemProps) {
    const colorScheme = useColorScheme();
    return (
        <View style={[{ backgroundColor: Colors[colorScheme].itemColor }, styles.item]}>
            <Text
                style={[styles.itemName, styles.text, { flexGrow: 1, color: Colors[colorScheme].text }]}
            >{item.name_product}</Text>
            <Text
                style={[styles.text, styles.itemPrice, { color: Colors[colorScheme].text }]}
            >R$ {item.price_product.toFixed(2)}</Text>
            <Text
                style={[styles.itemCount, { backgroundColor: Colors.bgSmooth, color: Colors[colorScheme].itemColor }]}
            >x {item.count}</Text>
        </View>
    );
}