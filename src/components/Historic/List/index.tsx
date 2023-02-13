import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { SaleOverviewProps, SalesResumeProps } from '../../../@types/sales';
import Colors from '../../../constants/Colors';

import useColorScheme from '../../../hooks/useColorScheme';
import { FontAwesome5, Foundation } from '@expo/vector-icons';
import { Pressable } from 'react-native';

interface SalesListProps {
    salesHistoric: SaleOverviewProps[]
}

export function HistoricList({ salesHistoric }: SalesListProps) {
    return (
        <FlatList
            style={{ flex: 1 }}
            data={salesHistoric}
            keyExtractor={(item => item.ym_date)}
            renderItem={header => <Item salesHistoric={header.item} />}
        />
    );
}
interface SalesListItem {
    salesHistoric: SaleOverviewProps
}

function Item({ salesHistoric }: SalesListItem) {
    const strDate = salesHistoric.ym_date;
    const [year, month] = strDate ? strDate.split('-') : '';
    const dateFormatted = `${month}/${year}`;

    const colorScheme = useColorScheme();

    const totalValue = salesHistoric.total?.toFixed(2).replace('.', ',')
    const costValue = salesHistoric.cost?.toFixed(2).replace('.', ',')
    const gainValue = salesHistoric.gain?.toFixed(2).replace('.', ',')
    return (
        <View style={[itemStyles.container]}>
            <Text style={[itemStyles.text, itemStyles.date, { color: Colors[colorScheme].textContrast }]}>{dateFormatted}</Text>
            <View style={itemStyles.values}>
                <Text style={[itemStyles.text, itemStyles.total, { color: Colors[colorScheme].text }]}>R$ {totalValue}</Text>
                {
                    salesHistoric.cost > 0 &&
                    <>
                        <Text style={[itemStyles.text, itemStyles.cost]}>- R$ {costValue}</Text>
                        <Text style={[itemStyles.text, itemStyles.gain]}>R$ {gainValue}</Text>
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
        flex: 1
    }
})
const itemStyles = StyleSheet.create({
    container: {
        borderRadius: 4,
        flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        overflow: 'hidden',
        marginTop: 6,
        width: '100%',
        height: 'auto',
        backgroundColor: Colors.primary,
        minHeight: 64,
        // padding: 0,
    },
    date: {
        marginLeft: 8,
        alignSelf: 'center',
    },
    values: {
        marginLeft: 'auto', marginRight: 8,
        alignItems: 'flex-end',
        alignSelf: 'center',
        paddingVertical: 4,

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
        // backgroundColor: Colors.red,
        backgroundColor: Colors.gray, paddingHorizontal: 8, justifyContent: 'center',
        borderLeftWidth: 2
    }
})
