import React, { useEffect, useState } from 'react';
import { FlatList, Modal, StyleSheet, ActivityIndicator, Text, TextInput, View } from 'react-native';
import { ProductProps } from '../@types/product';
import { ButtonsContainer, CancelButton, ConfirmButton, SingleButton } from '../components/common/Buttons';
import ConfirmationModal from '../components/common/ConfirmationModal';
import { ModalEditStock } from '../components/Stock/Modal';
import { StockList } from '../components/Stock/StockList';
import Colors from '../constants/Colors';
import { getGroupedProducts } from '../services/products';
import { updateQuantitiesOnDB } from '../services/stock';


export default function Stock() {
  const [products, setProducts] = useState<ProductProps[][]>([]);
  const [editMode, setEditMode] = useState(false);

  const [loading, setLoading] = useState(true);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const [newStock, setNewStock] = useState<Map<number, number>>(new Map());
  const [modal, setModal] = useState<{ showModal: boolean, options: { productId: number, type: 'add' | 'sub', initialStock: number } }>
    ({ showModal: false, options: {} as { productId: number, type: 'add' | 'sub', initialStock: number } });

  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'error' | 'info', msg: string }>({} as { type: 'error' | 'info', msg: string });
  useEffect(() => {
    getGroupedProducts().then(setProducts).finally(() => setLoading(false))
  }, [])

  function setFeedback(type: 'error' | 'info', msg: string) {
    setFeedbackMessage({ type, msg });
    setTimeout(() => {
      setFeedbackMessage({} as { type: 'error' | 'info', msg: string });
    }, 2000);
  }

  function confirmChanges() {
    setLoading(true)
    updateQuantitiesOnDB(newStock).then((response) => {

      setNewStock(new Map());
      setFeedback('info', 'Estoque atualizado com sucesso!');
      getGroupedProducts().then((products) => {
        setProducts(products);
      })
    }).catch(err => setFeedback('error', err))
      .finally(() => setLoading(false))
  }

  return (
    <View style={[styles.container]}>
      {

        loading ?
          <ActivityIndicator size={32} />
          :
          <View style={{ width: '100%' }}>
            {
              feedbackMessage.msg && //mensagem de errro
              < Text style={[styles.feedBack, feedbackMessage.type == 'error' ? styles.error : styles.info]}>{feedbackMessage.msg}</Text>
            }

            <ModalEditStock modal={modal} setModal={setModal} setNewStock={setNewStock} />

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

            {showConfirmationModal &&
              <ConfirmationModal
                onConfirm={() => {
                  confirmChanges()
                  setShowConfirmationModal(false)
                  setEditMode(false)
                }}
                setShowConfirmationModal={setShowConfirmationModal}
                showConfirmationModal={showConfirmationModal} />}


            {editMode ? //definição de botões
              <ButtonsContainer>
                <CancelButton onPress={() => {
                  setNewStock(oldMap => {
                    console.log(oldMap)
                    return new Map()
                  });
                  setEditMode(false);
                }} />
                <ConfirmButton onPress={() => {
                  setShowConfirmationModal(true)
                }} />
              </ButtonsContainer>
              :
              <SingleButton color={Colors.primary} title='Editar Estoque' onPress={() => setEditMode(true)} />
            }

          </View>
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
  error: {
    backgroundColor: Colors.lightRed,
    color: Colors.red,
  },
  feedBack: {
    width: '100%',
    textAlign: 'center',
    padding: 8,
    borderRadius: 4,
    marginTop: 4,
  },
  info: {
    backgroundColor: Colors.lightPrimary,
    color: Colors.primary,

  }
});
