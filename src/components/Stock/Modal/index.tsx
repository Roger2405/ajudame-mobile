import { parse } from 'expo-linking';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput } from 'react-native';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { ButtonsContainer, CancelButton, ConfirmButton } from '../../common/Buttons';

interface ModalStockProps {
    modal: {
        showModal: boolean;
        options: {
            productId: number;
            type: 'add' | 'sub';
            initialStock: number;
        };
    }
    setModal: React.Dispatch<React.SetStateAction<{
        showModal: boolean;
        options: {
            productId: number;
            type: 'add' | 'sub';
            initialStock: number;
        };
    }>>
    setNewStock: React.Dispatch<React.SetStateAction<Map<number, number>>>
}

export function ModalStock({ modal, setModal, setNewStock }: ModalStockProps) {
    const colorScheme = useColorScheme();
    const modalType = modal.options.type;
    const lightColor = modalType == 'add' ? Colors.primaryLight : Colors.grayLight;
    const mainColor = modalType == 'add' ? Colors.primary : Colors.gray;
    const [quantity, setQuantity] = useState(0);

    const initialStock = modal.options.initialStock;

    const onCheckLimit = (value: number) => {
        if (value > initialStock) {
            setQuantity(initialStock)
        } else {
            setQuantity(value)
        }
    }
    function validateValue(e: string) {
        const parsedQty = Number.parseInt(e)
        if (Number.isNaN(parsedQty)) {
            setQuantity(0) //setter for state
        }
        else if (modalType == 'sub') {
            onCheckLimit(parsedQty)
        }
        else {
            setQuantity(parsedQty);
        }
    }


    function closeModal() {
        setQuantity(0);
        setModal({ showModal: false, options: {} as { productId: number, type: 'add' | 'sub', initialStock: number; } })
    }
    function updateModal() {
        var newValue: number = modalType == 'add' ?
            newValue = initialStock + quantity :
            newValue = initialStock - quantity;

        setNewStock(oldStock => {
            return new Map(oldStock.set(modal.options.productId, newValue))
        })
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={!!modal?.showModal}
            onRequestClose={() => {
            }}
        >
            <View
                style={modalStyles.centeredView}>
                <View
                    style={modalStyles.modalView}>

                    <Text style={[modalStyles.title, { color: Colors.gray }]}>{modal?.options?.type == 'add' ? "Adicionar" : "Subtrair"} estoque</Text>
                    <View style={[modalStyles.border, { borderColor: lightColor, backgroundColor: Colors[colorScheme].background }]}>
                        <View style={{ marginRight: 16 }}>
                            <Text
                                style={{
                                    color: mainColor,
                                    fontSize: 16,
                                }}>Quantidade: </Text>

                            <Text style={{ color: lightColor, fontSize: 12 }}>
                                em estoque: {modalType === 'sub' ? initialStock - quantity : initialStock + quantity}
                            </Text>
                        </View>
                        <TextInput
                            // placeholder={`quantidade a ser ${modalType == 'add' ? 'adicionada' : 'subtraída'}`}
                            placeholderTextColor={lightColor}
                            cursorColor={Colors.primary}
                            keyboardType={'number-pad'}
                            autoFocus

                            style={{
                                backgroundColor: Colors[colorScheme].itemColor,
                                borderWidth: 1,
                                // elevation: 8,
                                borderColor: lightColor,
                                paddingHorizontal: 8,
                                paddingVertical: 4,
                                borderRadius: 4,
                                textAlign: 'right',
                                color: mainColor,
                                fontWeight: 'bold',
                                width: 100,
                                fontSize: 20,

                            }}
                            onChangeText={(e) => {
                                validateValue(e)
                            }}
                            value={quantity.toString()}
                        />
                    </View>
                    <ButtonsContainer>
                        <CancelButton
                            onPress={() => {
                                closeModal();
                            }}
                        />
                        <ConfirmButton
                            onPress={() => {
                                updateModal();
                                closeModal();
                            }}
                        />
                    </ButtonsContainer>
                </View>
            </View>
        </Modal>
        // <View style={styles.container}>

        // </View>
    );
}


const modalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22,
        margin: 20,
    },
    modalView: {
        width: '100%',
        padding: 8,
        backgroundColor: "white",
        borderRadius: 8,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    title: {
        textAlign: 'center',
        width: '100%',
        fontSize: 24,
    },
    border: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        borderWidth: 2,
        width: '100%',
        padding: 4,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
})
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: Colors.primary,

        // flexGrow: 1,
        // alignItems: 'center'
        // height: '100%',
        // width: '100%',
        // position: 'absolute'
    },
    content: {
        backgroundColor: Colors.gray,
        height: 200,

    }
})