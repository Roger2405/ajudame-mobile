import React, { useEffect, useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, TextInput, View } from 'react-native';
import { ProductProps } from '../@types/product';
import { ButtonsContainer, CancelButton, ConfirmButton, SingleButton } from '../components/common/Buttons';
import { ModalStock } from '../components/Stock/Modal';
import { StockList } from '../components/Stock/StockList';
import Colors from '../constants/Colors';
import { getGroupedProducts } from '../services/products';


export default function Stock() {
  const [products, setProducts] = useState<ProductProps[][]>([]);
  const [editMode, setEditMode] = useState(false);

  const [newStock, setNewStock] = useState<Map<number, number>>(new Map());
  const [modal, setModal] = useState<{ showModal: boolean, options: { productId: number, type: 'add' | 'sub', initialStock: number } }>
    ({ showModal: false, options: {} as { productId: number, type: 'add' | 'sub', initialStock: number } });

  // const [stockModalId, setStockModalId] = useState(0);

  useEffect(() => {
    getGroupedProducts().then(setProducts)
  }, [])
  // useEffect(() => {
  //   console.log(stockModalId)

  // }, [stockModalId])
  return (
    <View style={[styles.container]}>
      <ModalStock modal={modal} setModal={setModal} setNewStock={setNewStock} />

      <View style={{ flex: 1, width: '100%', flexBasis: '100%' }}>
        <FlatList
          style={{
            width: '100%',
            flex: 1,
            flexBasis: '100%',

          }}
          data={products}

          contentContainerStyle={{ paddingBottom: 120 }}
          renderItem={productsByType => <StockList setModal={setModal} setNewStock={setNewStock} newStock={newStock} products={productsByType.item} editMode={editMode} />}
        />
      </View >
      {editMode ?
        <ButtonsContainer>
          <CancelButton onPress={() => setEditMode(false)} />
          <ConfirmButton onPress={() => setEditMode(false)} />
        </ButtonsContainer>
        :
        <SingleButton color={Colors.primary} title='Editar Estoque' onPress={() => setEditMode(true)} />
      }

    </View>
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
});
