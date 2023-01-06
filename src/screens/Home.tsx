// import { axios } from 'axios';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';
import { OrderProductProps } from '../@types/orderProduct';
import OrderProducts from '../components/common/OrderProducts';
import { SingleButton } from '../components/common/Buttons';


export default function Home() {
  const [salesOfDay, setSalesOfDay] = useState<OrderProductProps[]>();
  const navigation = useNavigation();


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
    <View style={styles.container}>
      <Text style={styles.title}>Vendas do Dia</Text>
      {
        salesOfDay?.length ?
          <OrderProducts sales={salesOfDay} />
          :
          <Text>Não foi encontrada nenhuma venda!</Text>
      }
      <SingleButton onPress={() => navigation.navigate('AddSales')} color={Colors.primary} >
        Adicionar Venda
      </SingleButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
