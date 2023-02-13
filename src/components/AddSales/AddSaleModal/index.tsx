import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput } from 'react-native';
//CORES E TEMA
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';

import { ProductProps } from '../../../@types/product';

import { ButtonsContainer, CancelButton, ConfirmButton } from '../../common/Buttons';

interface ModalSaleProps {
    modal: {
        showModal: boolean;
        options: {
            product: ProductProps;
            type: 'add' | 'sub';
            initialCount?: number;
        };
    }
    setModal: React.Dispatch<React.SetStateAction<{
        showModal: boolean;
        options: {
            product: ProductProps;
            type: 'add' | 'sub';
            initialCount?: number;
        };
    }>>
}

export function ModalSale({ modal, setModal }: ModalSaleProps) {
    const colorScheme = useColorScheme();
    const [quantity, setQuantity] = useState<number | undefined>(undefined);

    const modalType = modal.options.type;

    const lightColor = modalType == 'add' ? Colors.lightPrimary : Colors.lightGray;
    const mainColor = modalType == 'add' ? Colors.primary : Colors.gray;

    const initialCount = modal.options.initialCount;

    const checkLimit = (value: number) => {
        if (initialCount)
            if (value > initialCount) {
                setQuantity(initialCount)
            } else {
                setQuantity(value)
            }
    }
    function validateValue(e: string) {
        const parsedQty = Number.parseInt(e)
        if (Number.isNaN(parsedQty)) {
            setQuantity(0)
        }
        else if (modalType == 'sub') {
            checkLimit(parsedQty)
        }
        else {
            setQuantity(parsedQty);
        }
    }


    function closeModal() {
        setQuantity(0);
        setModal({ showModal: false, options: {} as { product: ProductProps, type: 'add' | 'sub', initialStock: number; } })
    }
    function updateModal() {

    }

    return (
        <Modal
            animationType="fade"
            statusBarTranslucent
            transparent
            visible={modal?.showModal}
            onRequestClose={() => {
            }}
        >
            <View
                style={modalStyles.centeredView}>
                <View
                    style={modalStyles.modalView}>

                    <Text style={[modalStyles.title, { color: Colors.gray }]}>{modal?.options?.type == 'add' ? "Adicionar" : "Subtrair"} Quantidade</Text>
                    <View style={[modalStyles.border, { borderColor: lightColor, backgroundColor: Colors[colorScheme].background }]}>
                        <View style={{ marginRight: 16 }}>
                            <Text
                                style={{
                                    color: mainColor,
                                    fontSize: 16,
                                }}>Quantidade: </Text>
                        </View>
                        <TextInput
                            placeholderTextColor={lightColor}
                            cursorColor={Colors.primary}
                            keyboardType={'number-pad'}
                            autoFocus

                            style={{
                                backgroundColor: Colors[colorScheme].itemColor,
                                borderWidth: 1,
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
                            defaultValue={undefined}
                            value={quantity?.toString()}
                        />
                    </View>
                    <ButtonsContainer relative>
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
    );
}


const modalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

        backgroundColor: Colors.bgSmooth,
        // marginTop: 22,
        padding: 20,
    },
    modalView: {
        width: '100%',
        padding: 8,
        paddingBottom: 0,
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
        borderRadius: 4,
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
