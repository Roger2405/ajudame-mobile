import React, { ReactNode, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, ButtonProps, ActivityIndicator } from "react-native";
import Colors from "../../../constants/Colors";
import { ButtonsContainer, CancelButton, ConfirmButton } from "../Buttons";

interface ConfirmationModalProps {
    setShowConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>
    showConfirmationModal: boolean
    message?: string
    onConfirm: () => Promise<unknown> | void
    children?: ReactNode
}

export default function ConfirmationModal({ showConfirmationModal, message, children, setShowConfirmationModal, onConfirm }: ConfirmationModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="none"

                transparent
                style={{ backgroundColor: Colors.gray }}
                statusBarTranslucent
                visible={showConfirmationModal}
                onRequestClose={() => {
                    onConfirm()?.then(() => {
                        setShowConfirmationModal(!showConfirmationModal);
                    })
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.text}>Confirmar ação?</Text>
                        {
                            message &&
                            <Text style={{ fontSize: 12, textAlign: "center", color: Colors.gray }}>{message}</Text>
                        }

                        {children}

                        {
                            isLoading ?
                                <View style={{ padding: 16 }}>
                                    <ActivityIndicator />
                                </View>
                                :
                                <ButtonsContainer relative>
                                    <CancelButton onPress={() => setShowConfirmationModal(false)} />
                                    <ConfirmButton onPress={() => {
                                        setIsLoading(true)
                                        onConfirm()?.then(() => {
                                            setShowConfirmationModal(false)
                                        })
                                            .finally(() => setIsLoading(false))
                                    }} />
                                </ButtonsContainer>
                        }

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
        // padding: 20,
        position: "absolute",

        right: 0,
        left: 0,
        height: '100%',
        width: '100%'
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 8,
        // paddingHorizontal: 8,
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
