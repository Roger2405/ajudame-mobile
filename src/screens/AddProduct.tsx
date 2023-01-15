
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Pressable, ImagePickerResult, Button, PermissionsAndroid, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import * as ImagePicker from 'expo-image-picker';
import { ButtonsContainer, CancelButton, ConfirmButton, DeleteButton } from '../components/common/Buttons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
// import { styles } from './styles';

export function AddProduct() {
    const colorScheme = useColorScheme();
    const [photoUri, setPhotoUri] = useState('');
    const navigation = useNavigation();


    async function handleChoosePhoto() {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            // aspect: [3, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setPhotoUri(result.assets[0].uri);
        }
    };


    return (
        <View style={styles.container}>
            <View>
                <View>
                    <View style={styles.group}>
                        <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Nome: </Text>
                        <TextInput style={[styles.input, { backgroundColor: Colors[colorScheme].itemColor }]} placeholder='Nome do produto' />
                    </View>
                    <View style={styles.group}>
                        <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Categoria: </Text>
                        <TextInput style={[styles.input, { backgroundColor: Colors[colorScheme].itemColor }]} placeholder='Categoria do produto' />
                    </View>
                    <View style={styles.group}>
                        <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Estoque Inicial: </Text>
                        <TextInput defaultValue='0' keyboardType='number-pad' style={[styles.input, { backgroundColor: Colors[colorScheme].itemColor }]} placeholder='Padrão: 0' />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 16 }}>
                    <View style={{ flex: 1, marginRight: 4 }}>

                        <View style={[styles.imageSquare, { overflow: 'hidden', backgroundColor: Colors.lightGray, borderRadius: 8 }]}>
                            {photoUri ? <Image source={{ uri: photoUri }} style={{ width: 200, height: 200 }} />
                                : <FontAwesome5 color={Colors.gray} name='image' size={128} />}
                        </View>
                        <View style={styles.buttons}>
                            <DeleteButton onPress={() => { setPhotoUri('') }} accessibilityLabel='Remover imagem do produto' />
                            <TouchableOpacity style={{ backgroundColor: Colors.primary, marginLeft: 4, borderRadius: 4, height: '100%', flexGrow: 1, alignItems: 'center', justifyContent: 'center' }} onPress={handleChoosePhoto} >
                                <Text style={{ textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase', color: Colors[colorScheme].textContrast }}>Escolher{'\n'}Imagem</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 1, marginLeft: 4 }}>
                        <View style={{}}>
                            <Text style={[styles.label, { fontWeight: '700' }]}>Preços</Text>
                            <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Principal: </Text>
                            <TextInput defaultValue='0' keyboardType='number-pad' style={[styles.input, { backgroundColor: Colors[colorScheme].itemColor }]} placeholder='Padrão: 0' />

                            <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Secundário: </Text>
                            <TextInput defaultValue='0' keyboardType='number-pad' style={[styles.input, { backgroundColor: Colors[colorScheme].itemColor }]} placeholder='Padrão: 0' />
                        </View>
                        <View style={{ borderBottomWidth: 1, marginTop: 16, marginBottom: 8 }} />
                        <View style={{}}>
                            <Text style={[styles.label, { fontWeight: '700' }]}>Custo:</Text>
                            <TextInput defaultValue='0' keyboardType='number-pad' style={[styles.input, { backgroundColor: Colors[colorScheme].itemColor }]} placeholder='Padrão: 0' />
                        </View>
                    </View>

                </View>
            </View>
            <ButtonsContainer>
                <CancelButton onPress={() => {
                    navigation.goBack();
                }} />
                <ConfirmButton />
            </ButtonsContainer>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 8,
        width: '100%',
    },
    group: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        // width: '100%',

    },
    label: {
        textTransform: 'uppercase',
        fontSize: 16,
        marginRight: 16,
        // flexBasis: '50%',
    },
    input: {
        elevation: 4,
        borderRadius: 4,
        flexGrow: 1,
        textAlign: 'right',
        paddingHorizontal: 8,
        paddingVertical: 8,
        // flexBasis: '50%',
    },
    imageSquare: {
        aspectRatio: 1 / 1,
        alignItems: 'center',
        justifyContent: 'center',
        // flexBasis: '75%'
    },
    buttons: {
        flexDirection: 'row',
        marginTop: 8,
        alignItems: 'center',
        height: 48,
    },
});
