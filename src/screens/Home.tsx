// import { axios } from 'axios';

import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';
import { ButtonsContainer, SingleButton } from '../components/common/Buttons';
import useColorScheme from '../hooks/useColorScheme';
import { Feather } from '@expo/vector-icons';
import { deleteLastSale, getOverview } from '../services/sales';
import { useSales } from '../contexts/sales';
import { FeedbackMessage } from '../components/common/FeedbackMessage';
import { useProducts } from '../contexts/products';
import getGroupedArray from '../utils/groupArray';
import { SaleOverviewProps, SaleProductProps } from '../@types/sales';
import OverView from '../components/SalesAnalysis/Overview';
import { PieChartComponent } from '../components/SalesAnalysis/PieChart';
import { SalesList } from '../components/SalesAnalysis/SalesList';
import { LastSale } from '../components/SalesAnalysis/LastSale';
import { RefreshControl } from 'react-native-gesture-handler';
import { NoCostAdvice } from '../components/SalesAnalysis/NoCostAdvice';
import { useStock } from '../contexts/stock';



export default function Home() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'error' | 'info', msg: string }>({} as { type: 'error' | 'info', msg: string });
  const { sales, noCostItems, lastSale, overviewData, dataPieChart, updateSales, isLoading } = useSales();


  const date = new Date();
  const localeDateString = date.toLocaleDateString()
  const [month, day, year] = localeDateString.split('/');
  const formatedDate = `20${year}-${month}-${day}`;
  useEffect(() => {
    () => updateSales(formatedDate)
  }, [])

  async function handleDeleteSale() {
    if (lastSale?.header.discounted_stock) {
      lastSale.products.forEach(console.log)

    }
    // deleteLastSale()
    //   .then((res) => {
    //     setFeedbackMessage({ type: 'info', msg: res as string })
    //     updateRecentSalesInContext()
    //   })
    //   .catch(err => {
    //     setFeedbackMessage({ type: 'error', msg: err })
    //   })

  }
  const onRefresh = React.useCallback(() => {
    updateSales(formatedDate)
  }, []);



  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
      {
        <>
          <FeedbackMessage feedbackMessage={feedbackMessage} setFeedbackMessage={setFeedbackMessage} />
          <ScrollView contentContainerStyle={{ paddingBottom: 96 }} style={[{ width: '100%' }]}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
            }
          >
            {//verifica se há produtos sem o custo informado, se houver, é exibida uma mensagem
              (noCostItems && noCostItems.length > 0 && overviewData.cost > 0) &&
              <NoCostAdvice noCostItems={noCostItems} />
            }
            {
              sales?.length ?
                <>
                  <OverView overviewData={overviewData} />
                  {
                    lastSale &&
                    <LastSale data={lastSale} handleDeleteSale={handleDeleteSale} />
                  }
                  {
                    dataPieChart && dataPieChart?.length > 1 ?
                      <PieChartComponent data={dataPieChart} />
                      :
                      <Text style={styles.chartError}>Não foi possível gerar o gráfico</Text>
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
  chartError: {
    textAlign: 'center', padding: 8, color: Colors.red, backgroundColor: Colors.lightRed, borderRadius: 8, marginVertical: 8
  }

});
