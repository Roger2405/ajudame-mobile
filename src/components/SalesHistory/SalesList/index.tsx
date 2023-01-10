import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SalesResumeProps } from '../../../@types/sales';
import Colors from '../../../constants/Colors';

import moment from 'moment';
import { styles } from '../../OptionsModal/styles';
import useColorScheme from '../../../hooks/useColorScheme';
import { FontAwesome5 } from '@expo/vector-icons';

interface SalesListProps {
    salesHeaders: SalesResumeProps[]
}

export function SalesList({ salesHeaders }: SalesListProps) {
    return (
        <View style={listStyles.container}>
            <FlatList
                data={salesHeaders}
                renderItem={header => <Item saleHeader={header.item} />}

            />
        </View>
    );
}
interface SalesListItem {
    saleHeader: SalesResumeProps
}

function Item({ saleHeader }: SalesListItem) {
    const strDate = saleHeader.day_sale.toString().split('T')[0];
    const [year, month, day] = strDate.split('-');
    const formatedString = `${day}/${month}/${year}`;

    const colorScheme = useColorScheme();

    return (
        <View style={[itemStyles.container, { backgroundColor: Colors.primary }]}>
            <FontAwesome5 name="caret-right" size={16} />
            <Text style={[itemStyles.text, itemStyles.date, { color: Colors[colorScheme].textContrast }]}>{formatedString}</Text>
            <Text style={[itemStyles.text, itemStyles.total, { color: Colors[colorScheme].text }]}>R$ {saleHeader.total.toFixed(2).replace('.', ',')}</Text>
        </View>
    )
}


const listStyles = StyleSheet.create({
    container: {
        width: '100%',
    }
})
const itemStyles = StyleSheet.create({
    container: {
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
        paddingVertical: 8,
        marginTop: 8,
        width: '100%'
    },
    date: {

    },
    total: {
        color: Colors.gray,
    },
    text: {
        fontWeight: 'bold'
    }
})
