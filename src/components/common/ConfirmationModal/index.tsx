import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, ButtonProps } from "react-native";
import Colors from "../../../constants/Colors";
import { ButtonsContainer, CancelButton, ConfirmButton } from "../Buttons";

interface ConfirmationModalProps {
    setShowConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>
    showConfirmationModal: boolean
    onConfirm: () => void
}

export default function ConfirmationModal({ showConfirmationModal, setShowConfirmationModal, onConfirm }: ConfirmationModalProps) {
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="none"

                transparent
                style={{ backgroundColor: Colors.gray }}
                statusBarTranslucent
                visible={showConfirmationModal}
                onRequestClose={() => {
                    setShowConfirmationModal(!showConfirmationModal);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.text}>Confirmar alterações?</Text>
                        <ButtonsContainer>
                            <CancelButton onPress={() => setShowConfirmationModal(false)} />
                            <ConfirmButton onPress={onConfirm} />
                        </ButtonsContainer>

                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.bgSmooth,
        padding: 20
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingBottom: 0,
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
    text: {
        fontSize: 24,
        marginVertical: 16,
        color: Colors.gray
    }
});
