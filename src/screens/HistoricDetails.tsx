// import { axios } from 'axios';

import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';
import { BackButton, ButtonsContainer } from '../components/common/Buttons';
import useColorScheme from '../hooks/useColorScheme';
import { getHistoricDetails } from '../services/sales';

import OverView from '../components/SalesAnalysis/Overview';
import { SalesList } from '../components/SalesAnalysis/SalesList';


import { FeedbackMessage } from '../components/common/FeedbackMessage';
import { PieChartComponent } from '../components/SalesAnalysis/PieChart';
import { HistoricDetailsItemProps } from '../@types/sales';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../@types/navigation';
import { Bar, VictoryBar, VictoryChart, VictoryLabel } from 'victory-native';
import { useSales } from '../contexts/sales';

type Props = NativeStackScreenProps<RootStackParamList, 'HistoricDetails'>;
export default function HistoricDetails({ route }: Props) {
  const date = route.params.date;
  const colorScheme = useColorScheme();

  const { dataPieChart, isLoading, noCostItems, overviewData, sales, updateSales } = useSales();
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'error' | 'info', msg: string }>({} as { type: 'error' | 'info', msg: string });

  const [dataBarChart, setDataBarChart] = useState<HistoricDetailsItemProps[]>();


  useEffect(() => {
    updateSales(date)
    getHistoricDetails(date)
      .then((res) => setDataBarChart(res as HistoricDetailsItemProps[]))
      .catch(alert)
  }, [])

  const pluralSuffix = noCostItems && (noCostItems?.length) > 1 && 's';
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
                (noCostItems && noCostItems.length > 0 && overviewData.cost > 0) &&
                <View style={[styles.costInfo, { backgroundColor: Colors.lightRed }]}>
                  <Text style={[styles.costInfoMessage, { color: Colors[colorScheme].itemColor }]}>Há {noCostItems?.length} produto{pluralSuffix} nas vendas sem custo informado!</Text>
                  <Text style={[styles.costInfoMessage, { backgroundColor: Colors.lightRed, color: Colors[colorScheme].itemColor, marginBottom: 4 }]}>Informe o custo do{pluralSuffix} produto{pluralSuffix}: {noCostItems.map((item, index) => {
                    const max_index = 4;
                    if (index < max_index)
                      return (index === 0 ? '' : ', ') + item.name_product
                    else if (index == max_index) {
                      const rest = noCostItems?.length - index;
                      return ` + ${rest} ite${rest > 1 ? 'ns' : 'm'}`
                    }
                  })}</Text>
                </View>
              }
              {
                sales?.length ?
                  <>
                    <OverView overviewData={overviewData} />
                    {
                      dataPieChart ?
                        dataPieChart.length > 1 ?
                          <PieChartComponent data={dataPieChart} />
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
                            // labels={({ datum }) => datum.total.toFixed(2)}
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
                            // labels={({ datum }) => datum.total.toFixed(2)}
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
                    <SalesList sales={sales} />
                  </>
                  :
                  <Text style={{ textAlign: 'center', marginTop: 300 }}>Não há nenhuma venda!</Text>
              }
            </ScrollView>
          </>
      }
      <ButtonsContainer style={{ position: 'absolute', bottom: 0 }}>
        {/* <SingleButton onPress={() => navigation.navigate('NewSale')} color={Colors.gray} title='Voltar' icon={<Feather name='plus' size={24} color={Colors.white} />} /> */}
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

