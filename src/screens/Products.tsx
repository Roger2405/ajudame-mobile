import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { ProductProps } from '../@types/product';
import { SingleButton } from '../components/common/Buttons';
import { ProductList } from '../components/Products/ProductList';
import Colors from '../constants/Colors';
import { getGroupedProducts, getProducts } from '../services/products';

export default function Products() {
  const [products, setProducts] = useState<ProductProps[][]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    getGroupedProducts().then(setProducts)
  }, [])
  return (
    <View style={styles.container}>
      <View>

        <FlatList
          style={{
            flexBasis: '100%',
            flex: 1,
          }}
          data={products}
          contentContainerStyle={{ paddingBottom: 120 }}
          renderItem={productsByType => <ProductList products={productsByType.item} />}
        />
      </View>
      <SingleButton onPress={() => navigation.navigate('AddProduct')} color={Colors.primary} title='Adicionar Produto' icon={<FontAwesome5 name='plus' size={24} color={Colors.white} />} />
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
