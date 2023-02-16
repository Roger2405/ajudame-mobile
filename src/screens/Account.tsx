import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { PasswordInput } from '../components/auth/TextInput';
import { BackButton, ButtonsContainer, ConfirmButton } from '../components/common/Buttons';
import ConfirmationModal from '../components/common/ConfirmationModal';
import Colors from '../constants/Colors';
import { useAuth } from '../contexts/auth';
import useColorScheme from '../hooks/useColorScheme';


export function Account() {
    const { user } = useAuth();
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const colorScheme = useColorScheme();
    const { signOut } = useAuth();

    async function handleDeleteAccount() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve('Sucesso')
            }, 2000)
        })
            .then(alert)
            .then(() => signOut())
    }
    return (
        <View style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
            <View>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Email:</Text>
                <Text>{user?.email}</Text>
            </View>
            <Button title='Deletar conta' color={Colors.red} onPress={() => setShowConfirmationModal(true)} />
            <View>
                {
                    showConfirmationModal &&
                    <ConfirmationModal message='Você está prestes a excluir a sua conta e todos os dados relacionados à ela!' onConfirm={handleDeleteAccount} setShowConfirmationModal={setShowConfirmationModal} showConfirmationModal={showConfirmationModal} >
                        {/* <Text>Digite a sua senha para confirmar:</Text> */}
                        <PasswordInput style={{ maxWidth: '100%' }} label='Digite a sua senha para confirmar:' />
                        {/* <View style={{ width: '100%', flexDirection: 'row' }}>
                            <TextInput style={{ backgroundColor: Colors[colorScheme].background, borderRadius: 4, flex: 1, marginHorizontal: 8, padding: 8 }} />
                        </View> */}
                    </ConfirmationModal>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 8
    },
    title: {
        fontSize: 24,
        marginVertical: 8,
    }
})