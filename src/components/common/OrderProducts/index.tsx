import React from 'react';
import { View, Text, ListRenderItemInfo, TouchableOpacity, FlatList } from 'react-native';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { OrderProductProps } from '../../../@types/orderProduct';
import { styles } from './styles';

interface Props {
    sales: OrderProductProps[]
    editable?: boolean
    setOrderProducts?: React.Dispatch<React.SetStateAction<OrderProductProps[]>>
}

export default function OrderProducts({ sales, editable, setOrderProducts }: Props) {
    return (
        <FlatList
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 150 }}
            data={sales}    //v´`--if (editable === true) && |for passado o hook para alterar o OrderProducts| -> será renderizado o <EditableItem />
            renderItem={i => (editable && setOrderProducts) ? <EditableItem item={i.item} setOrderProducts={setOrderProducts} /> : <Item item={i.item} />}
            keyExtractor={item => item.name_product}
        />
    )
}

interface ItemProps {
    item: OrderProductProps
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
                style={[styles.itemCount, { backgroundColor: Colors.gray, color: Colors[colorScheme].itemColor }]}
            >x {item.count}</Text>
        </View>
    );
}
interface EditableItemProps extends ItemProps {
    setOrderProducts: React.Dispatch<React.SetStateAction<OrderProductProps[]>>
}

export function EditableItem({ item, setOrderProducts }: EditableItemProps) {
    return (
        <TouchableOpacity activeOpacity={0.5} onPress={() => _subProductToOrder(setOrderProducts, item)}>
            <Item item={item} />
        </TouchableOpacity>

    )
}

function _subProductToOrder(setOrderProducts: (value: React.SetStateAction<OrderProductProps[]>) => void, product: OrderProductProps,) {
    setOrderProducts(orderProducts => {
        const indexOfProduct = orderProducts.findIndex(item => item.id_product == product.id_product);
        const oldItem = orderProducts[indexOfProduct];

        oldItem.count--;
        if (oldItem.count <= 0) {
            orderProducts.splice(indexOfProduct, 1);
        }

        return [...orderProducts]
    })
}