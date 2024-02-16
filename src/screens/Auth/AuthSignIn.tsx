
import { Foundation } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { SingleButton } from '../../components/common/Buttons';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { useAuth } from '../../contexts/auth';
import { InputField, PasswordInput } from '../../components/auth/TextInput';



export function AuthSignIn() {
    const { signIn } = useAuth()
    const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    function handleLogIn() {
        // if (email && password && !errorMessage)
            signIn(email, password).catch(err => setErrorMessage(err.message));
        // else {
            // setErrorMessage('Preencha os campos corretamente!')
        // }
    }

    useEffect(() => {
        if (email && emailRegEx.test(email) == false) {
            setErrorMessage('Email inválido')
        }
        else {
            setErrorMessage('')
        }
    }, [email])

    const colorScheme = useColorScheme();
    const navigation = useNavigation();
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
                    <InputField keyboardType='email-address' autoCapitalize='none' caretHidden={false} label='Email' placeholder='exemplo@email.com' onChangeText={setEmail} value={email} icon={
                        <Foundation style={styles.icon} name={'mail'} size={20} />} />
                    <PasswordInput placeholder='Sua senha' label='Senha' onChangeText={setPassword} value={password} />

                    {/* <Text style={{ color: 'blue', paddingBottom: 8, textAlign: 'right' }}>Esqueci minha senha</Text> */}
                    {
                        errorMessage &&
                        <Text style={{ textAlign: 'center', marginVertical: 4, color: Colors.red }}>{errorMessage}</Text>
                    }
                    <SingleButton color={Colors.primary} onPress={handleLogIn} title='Entrar' />


                    <Text style={{ color: Colors[colorScheme].text }}>Ainda não possui uma conta?</Text>
                    <SingleButton onPress={() => navigation.navigate('SignUp')} color={Colors.primary} title='Cadastre-se' />
                </View>
            </View>
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
        backgroundColor: Colors.white,
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