// import { axios } from 'axios';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';
import { SaleProductProps } from '../@types/orderProduct';
import { ButtonsContainer, DeleteButton, SingleButton } from '../components/common/Buttons';
import useColorScheme from '../hooks/useColorScheme';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { deleteLastSale, getLastSale } from '../services/sales';
import { SalesList, SalesListItem } from '../components/Home/SalesList';
import { OverView } from '../components/Home/Overview';
import { LastSale } from '../components/Home/LastSale';
import { useRecentSales } from '../contexts/sales';
import { FeedbackMessage } from '../components/common/FeedbackMessage';
import { useProducts } from '../contexts/products';
import getGroupedArray from '../utils/groupArray';
import { PieChartComponent } from '../components/common/PieChart';
import { PieChartKitComponent } from '../components/common/PieChartKit';



export default function Home() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  const { productTypes } = useProducts();
  const { sales, lastSale, updateRecentSalesInContext, isLoading } = useRecentSales();
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'error' | 'info', msg: string }>({} as { type: 'error' | 'info', msg: string });

  const [dataPieChart, setDataPieChart] = useState<{
    label: string;
    type: string,
    sum: number;
  }[]>();


  useEffect(() => {
    if (sales) {
      const groupedSales: SaleProductProps[][] = getGroupedArray(sales, productTypes)
      var newData = [] as typeof dataPieChart;

      for (let i = 0; i < groupedSales.length; i++) {
        const group = groupedSales[i];
        const type_products = group[0].type_product;
        const typeWrapped = type_products.split(' ');
        const label = typeWrapped.join('\n');

        let sum = 0;
        groupedSales[i].forEach(sale => {
          sum += sale.count * sale.price_product;
        })
        newData?.push(
          {
            label,
            type: type_products,
            sum,
          })
      }


      // console.log(newData)
      setDataPieChart(newData)
    }

  }, [sales])

  async function handleDeleteSale() {
    deleteLastSale()
      .then((res) => {
        setFeedbackMessage({ type: 'info', msg: res as string })
        updateRecentSalesInContext()
      })
      .catch(err => {
        setFeedbackMessage({ type: 'error', msg: err })
      })

  }

  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
      {
        isLoading ?
          <ActivityIndicator />
          :
          <>
            {/* <FeedbackMessage feedbackMessage={feedbackMessage} setFeedbackMessage={setFeedbackMessage} /> */}
            <ScrollView contentContainerStyle={{ paddingBottom: 96 }} style={[{ width: '100%' }]}>
              {
                sales?.length ?
                  <>
                    <OverView salesOfDay={sales} />
                    {
                      lastSale &&
                      <LastSale data={lastSale} handleDeleteSale={handleDeleteSale} />
                    }
                    {
                      dataPieChart ?
                        dataPieChart.length > 1 ?
                          <PieChartComponent data={dataPieChart} />
                          :
                          <></>
                        :
                        <Text style={{ textAlign: 'center', padding: 8, color: Colors.red, backgroundColor: Colors.lightRed, borderRadius: 8, marginVertical: 8 }}>Não foi possível gerar o gráfico</Text>
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
        <SingleButton onPress={() => navigation.navigate('NewSale')} color={Colors.primary} title='Adicionar Venda' icon={<Feather name='plus' size={24} color={Colors.white} />} />
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

