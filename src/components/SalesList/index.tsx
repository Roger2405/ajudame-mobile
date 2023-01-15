import React from 'react';
import { View, Text, ListRenderItemInfo, TouchableOpacity, FlatList } from 'react-native';
import { SaleProductProps } from '../../@types/orderProduct';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { styles } from './styles';

interface Props {
    sales: SaleProductProps[]
    editable?: boolean
    setOrderProducts?: React.Dispatch<React.SetStateAction<SaleProductProps[]>>
}

export default function SalesList({ sales }: Props) {
    return (
        <FlatList
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 150 }}
            data={sales}    //v´`--if (editable === true) && |for passado o hook para alterar o OrderProducts| -> será renderizado o <EditableItem />
            renderItem={i => <Item item={i.item} />}
            keyExtractor={item => item.name_product}
        />
    )
}

interface ItemProps {
    item: SaleProductProps
}

export function Item({ item }: ItemProps) {
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
            <Text>{item.time}</Text>
        </View>
    );
}