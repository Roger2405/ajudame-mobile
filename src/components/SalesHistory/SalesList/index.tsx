import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SaleOverviewProps, SalesResumeProps } from '../../../@types/sales';
import Colors from '../../../constants/Colors';

import { styles } from '../../OptionsModal/styles';
import useColorScheme from '../../../hooks/useColorScheme';
import { FontAwesome5, Foundation } from '@expo/vector-icons';
import { Pressable } from 'react-native';

interface SalesListProps {
    salesHistoric: SaleOverviewProps[]
}

export function SalesHistoricList({ salesHistoric }: SalesListProps) {
    return (
        <View style={listStyles.container}>
            <FlatList
                data={salesHistoric}
                renderItem={header => <Item salesHistoric={header.item} />}

            />
        </View>
    );
}
interface SalesListItem {
    salesHistoric: SaleOverviewProps
}

function Item({ salesHistoric }: SalesListItem) {
    const strDate = salesHistoric.ym_date;
    const [year, month] = strDate ? strDate.split('-') : '';
    const formatedString = `${month}/${year}`;

    const colorScheme = useColorScheme();


    return (
        <View style={[itemStyles.container, { backgroundColor: Colors.primary }]}>
            <Text style={[itemStyles.text, itemStyles.date, { color: Colors[colorScheme].textContrast }]}>{formatedString}</Text>
            <View style={itemStyles.values}>
                <Text style={[itemStyles.text, itemStyles.total, { color: Colors[colorScheme].text }]}>R$ {salesHistoric.total.toFixed(2).replace('.', ',')}</Text>
                {
                    salesHistoric.cost &&
                    <>
                        <Text style={[itemStyles.text, itemStyles.cost]}>- R$ {salesHistoric.cost.toFixed(2).replace('.', ',')}</Text>
                        <Text style={[itemStyles.text, itemStyles.gain]}>R$ {salesHistoric.gain.toFixed(2).replace('.', ',')}</Text>
                    </>
                }
            </View>
            <Pressable style={[itemStyles.button, { borderColor: Colors[colorScheme].background }]}>
                <Foundation name='graph-bar' size={32} color={Colors.white} />
            </Pressable>
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
        // justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden',
        marginTop: 8,
        width: '100%'
    },
    date: {
        marginLeft: 8
    },
    values: {
        marginLeft: 'auto', marginRight: 8,
        alignItems: 'flex-end'
    },
    total: {
        // color: Colors.gray,
    },
    cost: {
        color: Colors.red,
        fontSize: 16,
    },
    gain: {
        color: Colors.white,
        fontSize: 20,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: Colors.gray, padding: 8, height: '100%', justifyContent: 'center',
        borderLeftWidth: 2
    }
})
