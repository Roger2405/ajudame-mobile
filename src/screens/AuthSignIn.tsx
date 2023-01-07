
import { FontAwesome5, Foundation } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { User } from '../@types/user';
import { DualButtons, SingleButton } from '../components/common/Buttons';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { userLogIn } from '../services/Auth';

interface SignInProps {
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>
}

export function AuthSignIn({ setIsLogged }: SignInProps) {
    const colorScheme = useColorScheme();


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [user, setUser] = useState<User>();

    const [hidePassword, setHidePassword] = useState(true);

    const navigation = useNavigation();

    function handleLogIn() {
        userLogIn(email, password)
            .then((response) => {
                if (response.success) {
                    AsyncStorage.setItem('user', JSON.stringify(response.user));
                    setIsLogged(true);
                }
                else
                    setErrorMessage(response.msg);
            })
    }


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
                    <View style={styles.field}>
                        <Text style={[styles.label, { color: Colors[colorScheme].textContrast }]}>Email</Text>

                        <View style={[styles.inputContainer, { backgroundColor: Colors[colorScheme].itemColor }]}>
                            <Foundation style={styles.icon} name={'mail'} size={20} />
                            <TextInput style={[styles.input, { backgroundColor: Colors[colorScheme].itemColor }]}
                                onChangeText={setEmail}
                                value={email}
                                placeholder="exemplo@email.com"
                                keyboardType="email-address"
                            />
                        </View>
                    </View>
                    <View style={styles.field}>
                        <Text style={[styles.label, { color: Colors[colorScheme].textContrast }]}>Senha</Text>

                        <View style={[styles.inputContainer, { backgroundColor: Colors[colorScheme].itemColor }]}>
                            <Foundation style={styles.icon} name={'lock'} size={20} />
                            <TextInput style={[styles.input, { backgroundColor: Colors[colorScheme].itemColor }]}
                                onChangeText={setPassword}
                                value={password}
                                placeholder="Sua senha"
                                secureTextEntry={hidePassword}
                            />
                            <TouchableOpacity onPress={() => {
                                setHidePassword(!hidePassword)
                            }} style={[styles.icon, { alignItems: 'center', width: 50 }]}>
                                <FontAwesome5 name={hidePassword ? 'eye' : 'eye-slash'} size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>


                    {/* <Text style={{ color: 'blue', paddingBottom: 8, textAlign: 'right' }}>Esqueci minha senha</Text> */}
                    {
                        errorMessage &&
                        <Text style={{ textAlign: 'center', marginVertical: 4, color: Colors.red, fontWeight: 'bold' }}>{errorMessage}</Text>
                    }
                    <SingleButton color={Colors[colorScheme].itemColor} onPress={handleLogIn} title='Entrar' />


                    <Text style={{ color: Colors[colorScheme].textContrast }}>Ainda não possui uma conta?</Text>
                    <SingleButton color={Colors[colorScheme].itemColor} title='Cadastre-se' />
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
    field: {
        marginBottom: 8,

        position: 'relative',
    },
    label: {
        fontWeight: '700',
    },
    input: {
        padding: 8,
        flexGrow: 1,
    },
    icon: {
        padding: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 4,
        overflow: 'hidden',

    },
});