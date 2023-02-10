// import { axios } from 'axios';

import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';
import { SaleProductProps } from '../@types/orderProduct';
import { ButtonsContainer, SingleButton } from '../components/common/Buttons';
import useColorScheme from '../hooks/useColorScheme';
import { Feather } from '@expo/vector-icons';
import { deleteLastSale } from '../services/sales';
import { SalesList } from '../components/Home/SalesList';
import { OverView } from '../components/Home/Overview';
import { LastSale } from '../components/Home/LastSale';
import { useRecentSales } from '../contexts/sales';
import { FeedbackMessage } from '../components/common/FeedbackMessage';
import { useProducts } from '../contexts/products';
import getGroupedArray from '../utils/groupArray';
import { PieChartComponent } from '../components/common/PieChart';



export default function Home() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  const { productTypes } = useProducts();
  const { sales, noCostItems, lastSale, updateRecentSalesInContext, isLoading } = useRecentSales();
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'error' | 'info', msg: string }>({} as { type: 'error' | 'info', msg: string });

  const [dataPieChart, setDataPieChart] = useState<{
    label: string;
    type: string,
    sum: number;
  }[]>();
  const date = new Date();
  const formatedDate = date.toISOString().split('T')[0];

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

  const pluralSuffix = noCostItems && (noCostItems?.length) > 1 && 's';
  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
      {
        isLoading ?
          <ActivityIndicator />
          :
          <>
            <FeedbackMessage feedbackMessage={feedbackMessage} setFeedbackMessage={setFeedbackMessage} />
            <ScrollView contentContainerStyle={{ paddingBottom: 96 }} style={[{ width: '100%' }]}>

              {//verifica se há produtos sem o custo informado, se houver, é exibida uma mensagem
                (noCostItems && noCostItems.length > 0) &&
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
                    <OverView date={formatedDate} />
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

