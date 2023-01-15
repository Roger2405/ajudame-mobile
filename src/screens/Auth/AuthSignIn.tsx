
import { Foundation } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { SingleButton } from '../../components/common/Buttons';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { useAuth } from '../../contexts/auth';
import { InputField, PasswordInput } from '../../components/auth/TextInput';



export function AuthSignIn() {
    const { signIn } = useAuth()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    function handleLogIn() {
        signIn(email, password).catch(err => setErrorMessage(err.message));
    }


    const colorScheme = useColorScheme();
    return (

        <View style={styles.page}>
            <LinearGradient
                style={{
                    height: '100%',
                    width: '100%',
                    position: 'absolute',
                }}

                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                colors={[Colors.primary, Colors[colorScheme].background]}
            >
            </LinearGradient>

            <View style={[styles.container, { borderColor: Colors[colorScheme].itemColor }]}>
                <Text style={[styles.title, { color: Colors[colorScheme].textContrast }]}>Login</Text>

                <View>
                    <InputField label='Email' placeholder='exemplo@email.com' onChangeText={setEmail} value={email} icon={
                        <Foundation style={styles.icon} name={'mail'} size={20} />} />
                    <PasswordInput label='Senha' onChangeText={setPassword} value={password} />

                    {/* <Text style={{ color: 'blue', paddingBottom: 8, textAlign: 'right' }}>Esqueci minha senha</Text> */}
                    {
                        errorMessage &&
                        <Text style={{ textAlign: 'center', marginVertical: 4, color: Colors.red }}>{errorMessage}</Text>
                    }
                    <SingleButton color={Colors[colorScheme].itemColor} onPress={handleLogIn} title='Entrar' />


                    <Text style={{ color: Colors[colorScheme].textContrast }}>Ainda não possui uma conta?</Text>
                    <SingleButton color={Colors[colorScheme].itemColor} title='Cadastre-se' />
                </View>
            </View>
            <Button title='DEMO' onPress={() => {
                setEmail('teste@demo.com')
                setPassword('')
            }} />
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Colors.light.background,
        backfaceVisibility: 'hidden'
    },
    container: {
        backgroundColor: Colors.primary,
        marginHorizontal: 8,
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderRadius: 16,
        borderWidth: 4,

        elevation: 16,
        shadowOffset: { width: 0, height: -16 },
        shadowRadius: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: '900',
        textAlign: 'center',
    },
    icon: {
        padding: 8,
    },
});