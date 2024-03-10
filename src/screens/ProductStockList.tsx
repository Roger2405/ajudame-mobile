import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ImageComponent, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RefreshControl } from 'react-native-gesture-handler';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import { AntDesign, Feather } from '@expo/vector-icons';

import { ButtonsContainer } from '../components/common/Buttons';
import { productStockMockData } from '../utils/mock';


export default function ProductStockList() {
  
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  const [ state, setState ] = useState( false );

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
                <RefreshControl refreshing={false} onRefresh={() => { setState( !state ) }} />
              }
            >
              {
                productStockMockData.map( productStock => {
                  
                  let adviceMargin = productStock.pds_PctAdvice;
                  let min = productStock.pds_NumMin;
                  let max = productStock.pds_NumMax;
                  let current = productStock.pds_NumQtt;
                  let currentPercent = 0;
                  if( max > 0 || min > 0 ) {
                    currentPercent = ( current - min ) / ( max - min ) * 100;
                  }

                  // Status 1 = Enquadrado, 0 = Quase desenquadrado e -1 = Desenquadrado
                  let status = 1;
                  if( currentPercent === 0 ) {
                    status = 1;
                  } else if( currentPercent < 0 || currentPercent > 100 ) {
                    // Se extrapolou os limites da porcentadem -> DESENQUADRADO
                    status = -1;
                  } else if( currentPercent <= adviceMargin || currentPercent >= ( 100 - adviceMargin ) ) {
                    // Se está dentro da zona de aviso -> QUASE DESENQUADRADO
                    status = 0;
                  }

                  var colorIndicator;
                  switch ( status ) {
                    case -1:
                      colorIndicator = Colors.danger
                      break;
                    case 0:
                      colorIndicator = Colors.warning
                      break;
                    default:
                      colorIndicator = Colors.success
                      break;
                  }

                  return (
                    <View key={productStock.pds_IntCod} style={{ backgroundColor: Colors[colorScheme].itemColor, marginBottom: 8, padding: 8, gap: 8, flexDirection: 'row', borderRadius: 12, overflow: 'hidden' }}>

                      {/* Imagem */}
                      <Image style={{ height: 96, aspectRatio: 1/1, borderRadius: 8 }} source={{ uri: productStock.pdt_ImgImage }} />

                      <View style={{ flex: 1, justifyContent: 'space-between' }}>
                        {/* Header */}
                        <Text style={{ textTransform: 'uppercase', fontSize: 16, color: Colors.gray }}>Nome do produto teste</Text>

                        {/* Indicador */}
                        
                        {
                          currentPercent !== 0 &&
                          <View style={{ height: 4, backgroundColor: Colors[colorScheme].background , width: '100%', position: 'relative', overflow: 'hidden', borderRadius: 8 }}>
                              <View style={{ borderRightColor: Colors.white, borderRightWidth: 2, zIndex: 1, position: 'absolute', left: 0, top: 0, width: `${ adviceMargin }%`, height: '100%' }}></View>
                              <View style={{ borderLeftColor: Colors.white, borderLeftWidth: 2, zIndex: 1, position: 'absolute', right: 0, top: 0, width: `${ adviceMargin }%`, height: '100%' }}></View>
                              <View style={{ width: `${ currentPercent <= 0 ? 0 : currentPercent }%`, backgroundColor: colorIndicator, height: '100%' }}></View>
                          </View>
                        }

                        <View style={{ height: 40, flexDirection: 'row', gap: 4 }}>

                          {/* Limites ( valores ) */}
                          <View style={{ flexDirection: 'row', gap: 2, flexGrow: 1 }}>

                            {/* Mínimo */}
                            <View style={{ alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors[colorScheme].background, borderRadius: 4, flexGrow: 1 }}>
                              <Text style={{ fontSize: 8, color: Colors.gray, textAlign: 'center' }}>Mínimo</Text>
                              <Text style={{ fontSize: 16, fontWeight: '700', color: Colors.gray, textAlign: 'center' }}>{min}</Text>
                            </View>

                            {/* Atual */}
                            <View style={{ alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors[colorScheme].background, borderRadius: 4, flexGrow: 1 }}>
                              <Text style={{ fontSize: 8, color: colorIndicator, textAlign: 'center' }}>Em estoque</Text>
                              <Text style={{ fontSize: 16, fontWeight: '700', color: colorIndicator, textAlign: 'center' }}>{current}</Text>
                            </View>

                            {/* Máximo */}
                            <View style={{ alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors[colorScheme].background, borderRadius: 4, flexGrow: 1 }}>
                              <Text style={{ fontSize: 8, color: Colors.gray, textAlign: 'center' }}>Máximo</Text>
                              <Text style={{ fontSize: 16, fontWeight: '700', color: Colors.gray, textAlign: 'center' }}>{max}</Text>
                            </View>

                          </View>

                          {/* Ícone indicador */}
                          {
                            currentPercent !== 0 &&
                            <View style={{ height: '100%', aspectRatio: 1/1, borderRadius: 4, backgroundColor: status === -1 ? colorIndicator : ( status === 0  ? colorIndicator + '40' : 'transparent' ), alignItems: 'center', justifyContent: 'center' }}>
                              <AntDesign name={ status >= 0 ? "like2" : "dislike2" } size={24} color={ status === -1 ? Colors.white : colorIndicator } />
                            </View>
                          }
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
