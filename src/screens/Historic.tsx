// import { axios } from 'axios';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';
import { SingleButton } from '../components/common/Buttons';
import useColorScheme from '../hooks/useColorScheme';
import { getHistoric } from '../services/sales';
import { SaleOverviewProps, SalesResumeProps } from '../@types/sales';
import { SalesHistoricList } from '../components/SalesHistory/SalesList';
import { useRecentSales } from '../contexts/sales';


export default function Historic() {
    const [salesHistoric, setSalesHistoric] = useState<SaleOverviewProps[]>();
    const { sales } = useRecentSales();
    const navigation = useNavigation();
    const colorScheme = useColorScheme();

    useFocusEffect(
        React.useCallback(() => {
            getHistoric().then((res) => {
                setSalesHistoric(res as SaleOverviewProps[])
            }).catch(console.log)
        }, [sales])
    )

    return (
        <View style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
            {
                salesHistoric?.length ?
                    <SalesHistoricList salesHistoric={salesHistoric} />
                    :
                    <Text>Não foi encontrada nenhuma venda!</Text>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 4,
        flexBasis: '100%',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
