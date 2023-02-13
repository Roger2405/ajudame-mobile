import React from 'react';
import { View, Text, ListRenderItemInfo, TouchableOpacity, FlatList, ScrollView, Pressable } from 'react-native';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { OrderProductProps } from '../../../@types/orderProduct';
import { styles } from './styles';
import { useOrderProducts } from '../../../contexts/order';
import { DeleteButton } from '../../common/Buttons';
import { Feather } from '@expo/vector-icons';
import Animated, { Layout, FadeOutUp } from 'react-native-reanimated';

interface Props {
    editable?: boolean
}

export default function OrderProducts({ editable }: Props) {
    const { orderProducts } = useOrderProducts();
    return (
        <ScrollView
            style={styles.container}

        >
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
    const subtotal = ((item.price_product * item.count).toFixed(2).replace('.', ',') || 0);
    const { subProductOfOrder, addCountToOrderProduct } = useOrderProducts();
    const price = (item.price_product)?.toFixed(2).replace('.', ',')
    return (
        <Animated.View
            layout={Layout}
            exiting={FadeOutUp}
        >
            <View
                style={[{ backgroundColor: Colors[colorScheme].itemColor }, styles.item]}
            >

                {/* <DeleteButton borderRadius={0} backgroundColor={Colors.lightGray} onPress={() => { }} /> */}

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
// interface EditableItemProps extends ItemProps {
//     setOrderProducts: React.Dispatch<React.SetStateAction<OrderProductProps[]>>
// }

// export function EditableItem({ item, setOrderProducts }: EditableItemProps) {
//     return (
//         <TouchableOpacity activeOpacity={0.5} onPress={() => _subProductToOrder(setOrderProducts, item.id_product)}>
//             <Item item={item} />
//         </TouchableOpacity>

//     )
// }

// function _subProductToOrder(setOrderProducts: (value: React.SetStateAction<OrderProductProps[]>) => void, id_product: number) {
//     setOrderProducts(orderProducts => {
//         const indexOfProduct = orderProducts.findIndex(item => item.id_product == id_product);
//         const oldItem = orderProducts[indexOfProduct];

//         oldItem.count--;
//         if (oldItem.count <= 0) {
//             orderProducts.splice(indexOfProduct, 1);
//             // oldItem.count = 0;
//         }

//         return [...orderProducts]
//     })

// }
// function _addProductToOrder(setOrderProducts: (value: React.SetStateAction<OrderProductProps[]>) => void, id_product: number) {
//     setOrderProducts(orderProducts => {
//         const indexOfProduct = orderProducts.findIndex(item => item.id_product == id_product);
//         const oldItem = orderProducts[indexOfProduct];

//         oldItem.count++;
//         return [...orderProducts]
//     })
// }