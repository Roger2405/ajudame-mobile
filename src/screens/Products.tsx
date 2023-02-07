import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { ProductProps } from '../@types/product';
import { ButtonsContainer, SingleButton } from '../components/common/Buttons';
import { ProductList } from '../components/Products/ProductList';
import Colors from '../constants/Colors';
import { useProducts } from '../contexts/products';
import useColorScheme from '../hooks/useColorScheme';

export default function Products() {
  // const [products, setProducts] = useState<ProductProps[][]>([]);

  const navigation = useNavigation();
  const { productsGroupedByType, updateProductsInContext } = useProducts();

  const colorScheme = useColorScheme();
  useEffect(() => {
    updateProductsInContext();
  }, [])
  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
      {
        productsGroupedByType.length
        ?
        <FlatList
        style={{
          flexBasis: '100%',
          flex: 1,
        }}
        data={productsGroupedByType}
        contentContainerStyle={{ paddingBottom: 120 }}
        renderItem={productsByType => <ProductList products={productsByType.item} />}
        />
        :
        <Text>Não foi encontrado nenhum produto!</Text>
      }
      <ButtonsContainer>
        <SingleButton onPress={() => navigation.navigate('ProductForm', {})} color={Colors.primary} title='Adicionar Produto' icon={<Feather name='plus' size={24} color={Colors.white} />} />
      </ButtonsContainer>
    </View >
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
