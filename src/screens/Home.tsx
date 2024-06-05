import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RefreshControl } from 'react-native-gesture-handler';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import { Feather } from '@expo/vector-icons';

import { SaleProductProps } from '../@types/sales';

import { ButtonsContainer, SingleButton } from '../components/common/Buttons';
import { FeedbackMessage } from '../components/common/FeedbackMessage';

import { PieChart } from '../components/SalesAnalysis/PieChart';
import OverView from '../components/SalesAnalysis/Overview';
import { NoCostAdvice } from '../components/SalesAnalysis/NoCostAdvice';

import { deleteSale } from '../services/sales';
//CONTEXT
import { useSales } from '../contexts/sales';
import { useProducts } from '../contexts/products';
//UTILS
import getGroupedArray from '../utils/groupArray';
import { getPieChartData } from '../utils/sales';
import { SalesList } from '../components/SalesAnalysis/SalesList';
import { DetailedSale } from '../components/SalesAnalysis/DetailedSale';


export default function Home() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'error' | 'info', msg: string }>({} as { type: 'error' | 'info', msg: string });

  const { sales, lastSale, overviewData, updateSales, isLoading } = useSales();
  const [dataPieChart, setDataPieChart] = useState<{
    label: string;
    type: string;
    sum: number;
  }[] | undefined>([]);

  const [salesGroupedByType, setSalesGroupedByType] = useState<SaleProductProps[][]>([])

  useEffect(() => {
    if (sales) {
      const salesGroupedByType = getGroupedArray(sales, sales.map( i => i["type_product"] ) );
      setSalesGroupedByType(salesGroupedByType)
      const dataPieChart = getPieChartData(salesGroupedByType)
      setDataPieChart(dataPieChart)
    }
  }, [sales])

  async function handleDeleteSale(id_sale: number) {
    deleteSale(id_sale)
      .then((res) => {
        setFeedbackMessage({ type: 'info', msg: res as string })
        updateSales()
      })
      .catch(err => {
        setFeedbackMessage({ type: 'error', msg: err })
      })
  }

  const onRefresh = React.useCallback(() => {
    updateSales()
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
      <FeedbackMessage feedbackMessage={feedbackMessage} setFeedbackMessage={setFeedbackMessage} />
      {
        isLoading ?
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator size={32} />
          </View>
          :
          <>
            <ScrollView contentContainerStyle={{ paddingBottom: 96 }} style={[{ width: '100%' }]}
              refreshControl={
                <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
              }
            >
              {
                sales?.length ?
                  <>
                    {//verifica se há produtos sem o custo informado, se houver, é exibida uma mensagem
                      (overviewData?.cost > 0) &&
                      <NoCostAdvice sales={sales} />
                    }
                    <OverView overviewData={overviewData} />
                    {
                      lastSale &&
                      <View>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: Colors.gray }}>Última venda:</Text>
                        <DetailedSale data={lastSale} handleDeleteSale={handleDeleteSale} />
                        <Pressable onPress={() => navigation.navigate('DetailedSales')}>
                          <Text style={{ color: Colors.gray, textDecorationLine: 'underline', fontSize: 16, paddingHorizontal: 8, textAlign: 'right' }}>
                            Ver todas as vendas do dia
                          </Text>
                        </Pressable>
                      </View>
                    }
                    {
                      dataPieChart ?
                        dataPieChart?.length > 1 ?
                          <PieChart data={dataPieChart} />
                          :
                          <></>
                        :
                        <Text style={styles.chartError}>Não foi possível gerar o gráfico</Text>
                    }
                    <Text style={styles.title}>Produtos vendidos: </Text>
                    <SalesList salesGroupedByType={salesGroupedByType} />
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
