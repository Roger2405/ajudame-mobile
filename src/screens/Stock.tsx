import React, { useEffect, useState } from 'react';
import { FlatList, Modal, StyleSheet, ActivityIndicator, Text, TextInput, View, ScrollView } from 'react-native';
import { ProductProps } from '../@types/product';
import { ButtonsContainer, CancelButton, ConfirmButton, SingleButton } from '../components/common/Buttons';
import ConfirmationModal from '../components/common/ConfirmationModal';
import { FeedbackMessage } from '../components/common/FeedbackMessage';
import { ModalEditStock } from '../components/Stock/StockModal';
import { StockList } from '../components/Stock/StockList';
import Colors from '../constants/Colors';
import { updateStock } from '../services/stock';
import { useStock } from '../contexts/stock';
import useColorScheme from '../hooks/useColorScheme';


export default function Stock() {
  // const [products, setProducts] = useState<ProductProps[][]>([]);
  const [editMode, setEditMode] = useState(false);
  const colorScheme = useColorScheme();

  const [loading, setLoading] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const [modal, setModal] = useState<{ showModal: boolean, options: { productId: number, type: 'add' | 'sub', initialStock: number } }>
    ({ showModal: false, options: {} as { productId: number, type: 'add' | 'sub', initialStock: number } });

  const [newStock, setNewStock] = useState<Map<number, number>>(new Map());
  const { stockGroupedByType, updateStockInContext } = useStock();

  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'error' | 'info', msg: string }>({} as { type: 'error' | 'info', msg: string });
  
  
  function confirmChanges() {
    setLoading(true)
    updateStock(newStock).then((response) => {
      setNewStock(new Map());
      setFeedbackMessage({ type: 'info', msg: 'Estoque atualizado com sucesso!' });
      updateStockInContext();
    }).catch(err => setFeedbackMessage({ type: 'error', msg: err }))
      .finally(() => setLoading(false))
  }

  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
      <FeedbackMessage feedbackMessage={feedbackMessage} setFeedbackMessage={setFeedbackMessage} />
      <ModalEditStock modal={modal} setModal={setModal} setNewStock={setNewStock} />
      <View>
        {showConfirmationModal &&
          <ConfirmationModal
            onConfirm={() => {
              confirmChanges()
              setShowConfirmationModal(false)
              setEditMode(false)
            }}
            setShowConfirmationModal={setShowConfirmationModal}
            showConfirmationModal={showConfirmationModal} />}
      </View>
      {
        stockGroupedByType?.length
          ?
          <>
            {loading ?
              <ActivityIndicator size={32} />
              :
              <>
                <ScrollView style={{ flexBasis: '100%' }} contentContainerStyle={{ paddingBottom: 120 }}>
                  {stockGroupedByType.map(type => {
                    return <StockList key={type[0].type_product} setModal={setModal} setNewStock={setNewStock} newStock={newStock} arrStock={type} editMode={editMode} />
                  })}
                </ScrollView>

                {editMode ? //defini????o de bot??es
                  <ButtonsContainer>
                    <CancelButton onPress={() => {
                      setNewStock(() => {
                        return new Map()
                      });
                      setEditMode(false);
                    }} />
                    <ConfirmButton onPress={() => {
                      setShowConfirmationModal(true)
                    }} />
                  </ButtonsContainer>
                  :
                  <ButtonsContainer>
                    <SingleButton color={Colors.primary} title='Editar Estoque' onPress={() => setEditMode(true)} />
                  </ButtonsContainer>}

              </>
            }


          </>
          :
          <Text style={{ textAlign: 'center' }}>Adicione um produto {'\n'}para controlar o seu estoque!</Text>
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
});
