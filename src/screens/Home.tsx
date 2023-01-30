// import { axios } from 'axios';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';
import { SaleProductProps } from '../@types/orderProduct';
import { ButtonsContainer, DeleteButton, SingleButton } from '../components/common/Buttons';
import useColorScheme from '../hooks/useColorScheme';
import { FontAwesome5 } from '@expo/vector-icons';
import { deleteLastSale, getLastSale } from '../services/sales';
import { SalesList, SalesListItem } from '../components/Home/SalesList';
import { OverView } from '../components/Home/Overview';
import { LastSale } from '../components/Home/LastSale';
import { useRecentSales } from '../contexts/sales';
import { FeedbackMessage } from '../components/common/FeedbackMessage';

export default function Home() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  const { sales, lastSale, updateRecentSalesInContext, isLoading } = useRecentSales();
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'error' | 'info', msg: string }>({} as { type: 'error' | 'info', msg: string });


  async function handleDeleteSale() {
    deleteLastSale()
      .then((res) => {
        console.log('then delete')
        setFeedbackMessage({ type: 'info', msg: res as string })
        updateRecentSalesInContext()
      })
      .catch(err => {
        setFeedbackMessage({ type: 'error', msg: err })
      })

  }

  return (
    <View style={styles.container}>
      {
        isLoading ?
          <ActivityIndicator />
          :
          <>
            {/* <FeedbackMessage feedbackMessage={feedbackMessage} setFeedbackMessage={setFeedbackMessage} /> */}
            <ScrollView contentContainerStyle={{ paddingBottom: 96 }} style={[{ backgroundColor: Colors[colorScheme].background, width: '100%' }]}>
              {
                sales?.length ?
                  <>
                    <OverView salesOfDay={sales} />
                    {
                      lastSale &&
                      <LastSale data={lastSale} handleDeleteSale={handleDeleteSale} />
                    }
                    <Text style={styles.title}>Produtos vendidos: </Text>
                    <SalesList sales={sales} />
                  </>
                  :
                  <Text style={{ textAlign: 'center', marginTop: 300 }}>Não há nenhuma venda!</Text>
              }
            </ScrollView>
          </>
      }
      <ButtonsContainer style={{ position: 'absolute', bottom: 0 }}>
        <SingleButton onPress={() => navigation.navigate('NewSale')} color={Colors.primary} title='Adicionar Venda' icon={<FontAwesome5 name='plus' size={24} color={Colors.white} />} />
      </ButtonsContainer>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.gray,
  },
});

