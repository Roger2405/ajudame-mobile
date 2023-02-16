import React from 'react';
import { View, Text } from 'react-native';
import { SaleProductProps } from '../../../@types/sales';
import Colors from '../../../constants/Colors';
import { useProducts } from '../../../contexts/products';
import useColorScheme from '../../../hooks/useColorScheme';
import getGroupedArray from '../../../utils/groupArray';
import { styles } from './styles';

interface Props {
    salesGroupedByType: SaleProductProps[][]
    editable?: boolean
    setOrderProducts?: React.Dispatch<React.SetStateAction<SaleProductProps[]>>
}

export function SalesList({ salesGroupedByType }: Props) {
    const { productTypes } = useProducts();
    const colorScheme = useColorScheme();
    return (
        <View>
            {
                salesGroupedByType.map(groupOfTytpe => {
                    return (
                        <View key={groupOfTytpe[0].type_product} style={styles.typeContainer}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: Colors[colorScheme].text }}>{groupOfTytpe[0].type_product}</Text>
                            {
                                groupOfTytpe.map(item => {
                                    return <SalesListItem item={item} key={item.id} />
                                })
                            }

                        </View>)
                })
            }
        </View >
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