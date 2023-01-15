// import { axios } from 'axios';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';
import { OrderProductProps } from '../@types/orderProduct';
import OrderProducts from '../components/common/OrderProducts';
import { SingleButton } from '../components/common/Buttons';
import useColorScheme from '../hooks/useColorScheme';
import { FontAwesome5 } from '@expo/vector-icons';
import { getSalesByDay } from '../services/sales';


export default function Home() {
  const [salesOfDay, setSalesOfDay] = useState<OrderProductProps[]>([]);
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  useFocusEffect(
    React.useCallback(() => {
      getSalesByDay().then(setSalesOfDay)
    }, [])
  )



  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
      {
        salesOfDay?.length ?
          <OrderProducts sales={salesOfDay} />
          :
          <Text>Não foi encontrada nenhuma venda!</Text>
      }
      <SingleButton onPress={() => navigation.navigate('NewSale')} color={Colors.primary} title='Adicionar Venda' icon={<FontAwesome5 name='plus' size={24} color={Colors.white} />} />
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
