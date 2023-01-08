import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ProductProps } from '../@types/product';
import { getProducts } from '../services/products';

export default function Products() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    getProducts().then((res) => setProducts(res))
  }, [])
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Produtos</Text>
      <View>

      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
