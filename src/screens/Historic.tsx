// import { axios } from 'axios';

import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';
import { OrderProductProps } from '../@types/orderProduct';
import OrderProducts from '../components/common/OrderProducts';
import { SingleButton } from '../components/common/Buttons';
import useColorScheme from '../hooks/useColorScheme';
import { getSalesResume } from '../services/sales';
import { SalesResumeProps } from '../@types/sales';
import { SalesList } from '../components/SalesHistory/SalesList';


export default function Historic() {
    const [headerSales, setHeaderSales] = useState<SalesResumeProps[]>();
    const navigation = useNavigation();
    const colorScheme = useColorScheme();

    useEffect(() => {
        var idUser = 114;
        getSalesResume().then(setHeaderSales)

    }, [])



    return (
        <View style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
            {
                headerSales?.length ?
                    <SalesList salesHeaders={headerSales} />
                    :
                    <Text>Não foi encontrada nenhuma venda!</Text>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
