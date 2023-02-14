// import { axios } from 'axios';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';
import { SingleButton } from '../components/common/Buttons';
import useColorScheme from '../hooks/useColorScheme';
import { getHistoric } from '../services/sales';
import { SaleOverviewProps, SalesResumeProps } from '../@types/sales';
import { HistoricList } from '../components/Historic/List';
import { useRecentSales } from '../contexts/sales';


export default function Historic() {
    const [salesHistoric, setSalesHistoric] = useState<SaleOverviewProps[]>();
    const { sales } = useRecentSales();
    const [isLoading, setIsLoading] = useState(true);
    const colorScheme = useColorScheme();

    useFocusEffect(
        React.useCallback(() => {
            getHistoric().then((res) => {
                setSalesHistoric(res as SaleOverviewProps[])
            }).catch(console.log)
                .finally(() => { setIsLoading(false) })
        }, [sales])
    )

    return (
        <View style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
            {
                salesHistoric?.length ?
                    <HistoricList salesHistoric={salesHistoric} />
                    :
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        {
                            isLoading ?
                                <ActivityIndicator />
                                :
                                <Text style={{ textAlign: 'center' }}>Não foi encontrada nenhuma venda!</Text>
                        }
                    </View>
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
