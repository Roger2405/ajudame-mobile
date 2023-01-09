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


export default function Historic() {
    const [salesOfDay, setSalesOfDay] = useState<OrderProductProps[]>();
    const navigation = useNavigation();
    const colorScheme = useColorScheme();

    useEffect(() => {
        var idUser = 114;

        axios.get(`https://server-ajudame.vercel.app/${idUser}/sales/2023-01-02`)
            .then((response) => {
                if (response.data[0]) {
                    setSalesOfDay(response.data);
                }
                else {
                    throw Error(response.data.msg);
                }
            });
    }, [])



    return (
        <View style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
            <Text style={styles.title}>Vendas do Dia</Text>
            {
                salesOfDay?.length ?
                    <OrderProducts sales={salesOfDay} />
                    :
                    <Text>Não foi encontrada nenhuma venda!</Text>
            }
            <SingleButton onPress={() => navigation.navigate('AddSales')} color={Colors.primary} title='Adicionar Venda' iconName="plus" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
