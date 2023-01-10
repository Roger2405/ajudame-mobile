import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { ProductProps } from '../@types/product';
import { ButtonsContainer, CancelButton, ConfirmButton, SingleButton } from '../components/common/Buttons';
import { StockList } from '../components/Stock/StockList';
import Colors from '../constants/Colors';
import { getGroupedProducts } from '../services/products';


export default function Stock() {
  const [products, setProducts] = useState<ProductProps[][]>([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    getGroupedProducts().then(setProducts)
  }, [])
  return (
    <View style={styles.container}>
      <FlatList
        style={{
          width: '100%'
        }}
        data={products}
        renderItem={productsByType => <StockList products={productsByType.item} editMode={editMode} />}
      />
      {editMode ?
        <ButtonsContainer>
          <CancelButton onPress={() => setEditMode(false)} />
          <ConfirmButton onPress={() => setEditMode(false)} />
        </ButtonsContainer>
        :
        <SingleButton color={Colors.primary} title='Editar Estoque' onPress={() => setEditMode(true)} />
      }
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
