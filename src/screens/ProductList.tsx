import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ImageComponent, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RefreshControl } from 'react-native-gesture-handler';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import { AntDesign, Feather } from '@expo/vector-icons';

import { ButtonsContainer } from '../components/common/Buttons';
import { productMockData } from '../utils/mock';


export default function ProductList() {
  
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  return (
    <View style={[styles.container]}>
      {
        false ?
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator size={32} />
          </View>
          :
          <>
            <ScrollView contentContainerStyle={{ paddingBottom: 96 }} style={[{ width: '100%' }]}
              refreshControl={
                <RefreshControl refreshing={false} onRefresh={() => {}} />
              }
            >
              {
                productMockData.map( product => {
                  let randomCmv = product.pdc_NumVlCost;
                  let productMainPrice = ( Number( randomCmv ) + ( Math.random() * 40 ) ).toFixed(2);
                  let productMainGain = ( Number( product.pdt_NumMainPrice ) - Number( randomCmv ) ).toFixed(2);
                  let costVariation = Number( ( ( 1 - ( product.pdc_NumVlLastCost / product.pdc_NumVlCost ) ) * 100 ).toFixed(2) );

                  return (
                    <View key={product.pdt_IntCod} style={{ backgroundColor: Colors[colorScheme].itemColor, marginBottom: 8, borderRadius: 12, overflow: 'hidden' }}>

                      {/* Header */}
                      <View style={{ paddingTop: 16, padding: 8, paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between', position: 'relative' }}>

                        {/* \ ^ 0,00% \ Badge de oscilação de custo do produto */}
                        {
                          !!costVariation &&
                          <View style={{ backgroundColor: `${ costVariation > 0 ? Colors.danger : Colors.success }`, minWidth: 48, justifyContent: 'space-between', flexDirection: 'row', gap: 4, position: 'absolute', right: 0, top: 0, paddingVertical: 2, paddingHorizontal: 4, borderBottomLeftRadius: 8 }}>
                            <AntDesign name={ costVariation > 0 ? "arrowup" : "arrowdown" } size={12} color="white" />
                            <Text style={{ color: Colors.white, fontSize: 10 }}>{costVariation}%</Text>
                          </View>
  
                        }
                        <Text style={{ textTransform: 'uppercase', fontSize: 16, color: Colors.gray }}>Nome do produto teste</Text>
                        <Text style={{ color: Colors.primary, fontSize: 16, fontWeight: '700' }}>R$ { randomCmv }</Text>
                      </View>

                      {/* Body */}
                      <View style={{ flexDirection: 'row', gap: 8, padding: 8, position: 'relative' }}>

                        {/* Imagem */}
                        <Image style={{ height: 96, aspectRatio: 1/1, borderRadius: 8 }} source={{ uri: product.pdt_ImgImage }} />

                        {/* Linhas com valores */}
                        <View style={{ gap: 4, height: 96, flex: 1, padding: 4, justifyContent: 'space-between' }}>

                          {/* Valores do preço principal */}
                          <View style={{ flexDirection: 'row', height: 40, gap: 4, padding: 4, justifyContent: 'space-between' }}>
                            <View style={{ width: '60%' }}>
                              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                  <Text style={{ fontSize: 8, color: Colors[colorScheme].text }}>CMV: </Text><Text style={{ fontSize: 10, color: Colors[colorScheme].text, fontWeight: '700' }}>{ randomCmv }</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                  <Text style={{ fontSize: 8, color: Colors.gray }}>Lucro: </Text><Text style={{ fontSize: 10, fontWeight: '700', color: Colors.gray }}>{ productMainGain }</Text>
                                </View>
                              </View>
                              
                              {/* Indicador */}
                              <View style={{ flexDirection: 'row', height: 4, borderRadius: 8, overflow: 'hidden', backgroundColor: Colors.success }}>
                                <View style={{ backgroundColor: Colors[colorScheme].text, width: ( `${randomCmv}%` as any ), height: '100%' }}></View>
                                <View style={{ height: '100%', flexGrow: 1 }}></View>
                              </View>

                              
                              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={{ color: Colors[colorScheme].text, fontWeight: '700', fontSize: 12 }}>00,00 %</Text>
                                <Text style={{ color: Colors.gray, fontSize: 12 }}>00,00 %</Text>
                              </View>
                            </View>

                            {/* Preço */}
                            <View style={{ width: 'auto', justifyContent: 'center' }}>
                              <Text style={{ fontSize: 8, textAlign: 'right', color: Colors.gray, lineHeight: 8 }}>Preço primário</Text>
                              <Text style={{ textAlign: 'right', fontSize: 16, fontWeight: '700', color: Colors.gray, lineHeight: 20 }}>R$ { productMainPrice }</Text>
                            </View>
                          </View>

                          {/* Valores do preço secundário */}
                          <View style={{ flexDirection: 'row', height: 40, justifyContent: 'center', gap: 4, alignItems: 'center', padding: 4 }}>
                            <Text style={{ fontSize: 8, fontWeight: '300' }}>Preço secundário não informado</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  )
                })
              }
            </ScrollView>
          </>
      }
      <ButtonsContainer style={{ position: 'absolute', bottom: 0, width: 64, right: 0 }}>
        <Pressable onPress={() => navigation.navigate('NewSale')} style={({ pressed }) => [
            {
                // backgroundColor: pressed ? Colors[colorScheme].background : color,
                opacity: pressed ? 0.5 : 1,
                backgroundColor: Colors.primary,
                borderTopLeftRadius: 1000,
                padding: 16,
                paddingRight: 8,
                paddingBottom: 8
            }]}>
            <Feather name='plus' size={48} color={Colors.white} />
        </Pressable >
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
    textAlign: 'center', padding: 8, color: Colors.danger, backgroundColor: Colors.lightRed, borderRadius: 8, marginVertical: 8
  }

});
