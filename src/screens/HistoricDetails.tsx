import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { VictoryBar, VictoryChart } from 'victory-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import { BackButton, ButtonsContainer } from '../components/common/Buttons';
import { FeedbackMessage } from '../components/common/FeedbackMessage';

import { NoCostAdvice } from '../components/SalesAnalysis/NoCostAdvice';
import OverView from '../components/SalesAnalysis/Overview';
import { SalesList } from '../components/SalesAnalysis/SalesList';
import { PieChart } from '../components/SalesAnalysis/PieChart';


import { HistoricDetailsItemProps, PriceModels, SaleOverviewProps, SaleProductProps } from '../@types/sales';
import { RootStackParamList } from '../@types/navigation';

import { useProducts } from '../contexts/products';

import { getPieChartData } from '../utils/sales';
import getGroupedArray from '../utils/groupArray';

import { getHistoricDetails, getOverview, getSalesByDate } from '../services/sales';

type Props = NativeStackScreenProps<RootStackParamList, 'HistoricDetails'>;
export default function HistoricDetails({ route }: Props) {
  const date = route.params.date;
  const colorScheme = useColorScheme();

  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'error' | 'info', msg: string }>({} as { type: 'error' | 'info', msg: string });

  const [dataBarChart, setDataBarChart] = useState<HistoricDetailsItemProps[]>();
  const [sales, setSales] = useState<SaleProductProps[] | undefined>()
  const [noCostItems, setNoCostItems] = useState<SaleProductProps[]>()
  const [isLoading, setIsLoading] = useState(true)
  const [overviewData, setOverviewData] = useState<SaleOverviewProps>({} as SaleOverviewProps)
  const [priceModel, setPriceModel] = useState<PriceModels | undefined>('main');
  const [dataPieChart, setDataPieChart] = useState<{
    label: string;
    type: string,
    sum: number;
  }[]>();
  const { productTypes } = useProducts();
  const [salesGroupedByType, setSalesGroupedByType] = useState<SaleProductProps[][]>([])

  useEffect(() => {
    if (sales) {
      const salesGroupedByType = getGroupedArray(sales, productTypes)
      setSalesGroupedByType(salesGroupedByType)
      const dataPieChart = getPieChartData(salesGroupedByType)
      setDataPieChart(dataPieChart)
    }
  }, [sales])

  useEffect(() => {
    getHistoricDetails(date)
      .then((res) => setDataBarChart(res as HistoricDetailsItemProps[]))
      .then(() => getSalesByDate(date))
      .then(setSales)
      .then(() => getOverview(date))
      .then((res) => setOverviewData(res as SaleOverviewProps))
      .catch(alert)
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
      {
        isLoading ?
          <ActivityIndicator />
          :
          <>
            <Text style={{ fontSize: 20 }}>Vendas de: {date.split('-').reverse().join('/')}</Text>
            <FeedbackMessage feedbackMessage={feedbackMessage} setFeedbackMessage={setFeedbackMessage} />
            <ScrollView contentContainerStyle={{ paddingBottom: 96 }} style={[{ width: '100%' }]}>

              {//verifica se há produtos sem o custo informado, se houver, é exibida uma mensagem
                (sales && sales.length > 0 && overviewData.cost > 0) &&
                <NoCostAdvice sales={sales} />
              }
              {
                sales?.length ?
                  <>
                    <OverView overviewData={overviewData} />
                    {
                      dataPieChart ?
                        dataPieChart.length > 1 ?
                          <PieChart data={dataPieChart} />
                          :
                          <></>
                        :
                        <Text style={{ textAlign: 'center', padding: 8, color: Colors.red, backgroundColor: Colors.lightRed, borderRadius: 8, marginVertical: 8 }}>Não foi possível gerar o gráfico</Text>
                    }
                    {
                      dataBarChart?.length ?
                        <VictoryChart>
                          <VictoryBar
                            domainPadding={{ x: 24 }}
                            style={{
                              data: {
                                fill: Colors.primary
                              }
                            }}
                            data={dataBarChart}
                            x='day'
                            y='total'
                          />
                          <VictoryBar
                            domainPadding={{ x: 24 }}
                            style={{
                              data: {
                                fill: Colors.red
                              }
                            }}
                            data={dataBarChart}
                            x='day'
                            y='cost'
                          />

                        </VictoryChart>
                        :
                        <ActivityIndicator />

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
        <BackButton />
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
  costInfo: {
    borderWidth: 1,
    borderColor: Colors.red,
    borderRadius: 8,
    marginTop: 8,
    paddingHorizontal: 4,
  },
  costInfoMessage: {
    textAlign: 'center',
    paddingVertical: 2,
    borderRadius: 4
  }
});

