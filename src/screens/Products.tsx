import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { ProductProps } from '../@types/product';
import { ProductList } from '../components/Products/ProductList';
import Colors from '../constants/Colors';
import { getGroupedProducts, getProducts } from '../services/products';

export default function Products() {
  const [products, setProducts] = useState<ProductProps[][]>([]);

  useEffect(() => {
    getGroupedProducts().then(setProducts)
  }, [])
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Produtos</Text>
      <FlatList
        style={{
          flexGrow: 0,
          flexShrink: 0
        }}
        data={products}
        renderItem={productsByType => <ProductList products={productsByType.item} />}
      />
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
