// import { axios } from 'axios';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SingleButton } from '../components/Buttons';
import OrderProducts from '../components/OrderProducts';

import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import { OrderProductProps } from '../types/orderProduct';

type ProfileScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamList, 'TabSales'>,
  NativeStackNavigationProp<RootStackParamList>
>;

export default function TabSales() {
  const [salesOfDay, setSalesOfDay] = useState<OrderProductProps[]>();
  const navigation = useNavigation<ProfileScreenNavigationProp>();


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
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
