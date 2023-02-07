
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Button } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import * as ImagePicker from 'expo-image-picker';
import { ButtonsContainer, CancelButton, ConfirmButton, DeleteButton } from '../components/common/Buttons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { addProduct, deleteProduct, getProduct, updateProduct } from '../services/products';
import { useProducts } from '../contexts/products';
import { useStock } from '../contexts/stock';
import { RootStackParamList } from '../../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProductProps } from '../@types/product';
import api from '../services/api';
import ConfirmationModal from '../components/common/ConfirmationModal';
import { FeedbackMessage } from '../components/common/FeedbackMessage';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductForm'>;

type InputValuesProps = {
    name: string, type: string, mainPrice: number, secondaryPrice: number, cost: number, imagePath?: string | null
}
export default function ProductForm({ route }: Props) {
    const id_product = route.params.id;
    const [inputValues, setInputValues] = useState<InputValuesProps>({} as InputValuesProps)


    const colorScheme = useColorScheme();
    // const [photo, setPhoto] = useState<ImagePicker.ImagePickerAsset | null>();
    const navigation = useNavigation();
    const [showModalConfirmation, setShowModalConfirmation] = useState(false);

    const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'error' | 'info', msg: string }>({} as { type: 'error' | 'info', msg: string });

    const { updateProductsInContext } = useProducts();
    const { updateStockInContext } = useStock();

    useEffect(() => {
        if (id_product) {
            getProduct(id_product)
                .then(data => {
                    const { id, name_product, type_product, main_price, secondary_price, image_path } = data;
                    const fullImagePath = `${api.defaults.baseURL}${image_path}`;
                    setInputValues(() => {
                        return {
                            name: name_product, type: type_product, mainPrice: main_price, secondaryPrice: secondary_price || 0, cost: 0, imagePath: fullImagePath
                        }
                    })

                    // setInitialValues(() => {
                    //     return {
                    //         id, name_product, type_product, main_price, secondary_price,
                    //         image_path: image_path ? `${api.defaults.baseURL}${image_path}` : ''
                    //     }
                    // })
                })


        }
    }, [])
    // const [srcImagePreview, setSrcImagePreview] = useState('');


    async function handleSubmitForm() {
        const { name, type, mainPrice, secondaryPrice, cost, imagePath } = inputValues;

        if (!!name && !!type && !!mainPrice) {

            let formData = new FormData();

            formData.append('name', name)
            formData.append('type', type)
            formData.append('mainPrice', mainPrice.toString())
            formData.append('secondaryPrice', (secondaryPrice || 0).toString())
            formData.append('cost', (cost || 0).toString())

            console.log(mainPrice)
            if (imagePath) {
                let localUri = imagePath;
                let filename = localUri.split('/').pop();

                if (filename) {
                    let match = /\.(\w+)$/.exec(filename);
                    let type = match ? `image/${match[1]}` : `image`;
                    // @ts-ignore
                    formData.append('image', { uri: localUri, name: filename, type });
                }
            }
            const response = await (id_product ? updateProduct(formData, id_product) : addProduct(formData))

            if (response.success) {
                updateProductsInContext();
                updateStockInContext();
                navigation.navigate('Products')

            }
            else {
                setFeedbackMessage({ msg: 'Preencha os campos obrigatórios', type: 'error' })
            }

        }
    }


    async function handleChoosePhoto() {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            // aspect: [3, 3],
            quality: 1,
        });

        if (!result.canceled) {
            // setPhoto(result.assets[0]);
            const path = result.assets[0].uri;
            if (path)
                setInputValues(oldValues => { return { ...oldValues, imagePath: path } })
        }
    };
    function handleDeleteProduct() {
        if (id_product)
            deleteProduct(id_product)
                .then(res => {
                    console.log(res.data)
                    navigation.navigate('Products');
                    updateProductsInContext();
                    updateStockInContext();
                })
    }

    return (
        <View style={styles.container}>
            <View>
                <FeedbackMessage feedbackMessage={feedbackMessage} setFeedbackMessage={setFeedbackMessage} />
                <View>
                    <View style={styles.group}>
                        <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Nome: *</Text>
                        <TextInput
                            defaultValue={inputValues.name}
                            onChangeText={(e) =>
                                setInputValues((oldValues) => {
                                    return { ...oldValues, name: e }
                                })}
                            style={[styles.input, { backgroundColor: Colors[colorScheme].itemColor }]} placeholder='Nome do produto' />
                    </View>
                    <View style={styles.group}>
                        <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Categoria: *</Text>
                        <TextInput
                            defaultValue={inputValues.type}
                            onChangeText={(e) =>
                                setInputValues((oldValues) => {
                                    return { ...oldValues, type: e }
                                })} style={[styles.input, { backgroundColor: Colors[colorScheme].itemColor }]} placeholder='Categoria do produto' />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 16 }}>
                    <View style={{ flex: 1, marginRight: 4 }}>

                        <View style={[styles.imageSquare]}>
                            {
                                inputValues.imagePath ? <Image source={{ uri: inputValues.imagePath }} style={styles.image} />
                                    :
                                    <FontAwesome5 color={Colors.gray} name='image' size={128} />}
                        </View>
                        <View style={styles.buttons}>
                            <DeleteButton onPress={() => { setInputValues(oldValues => { return { ...oldValues, imagePath: null } }) }} accessibilityLabel='Remover imagem do produto' />
                            <TouchableOpacity style={{ backgroundColor: Colors.primary, marginLeft: 4, borderRadius: 4, height: '100%', flexGrow: 1, alignItems: 'center', justifyContent: 'center' }} onPress={handleChoosePhoto} >
                                <Text style={{ textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase', color: Colors[colorScheme].textContrast }}>Escolher{'\n'}Imagem</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 1, marginLeft: 4 }}>
                        <View style={{}}>
                            <Text style={[styles.label, { fontWeight: '700' }]}>Preços</Text>
                            <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Principal: *</Text>
                            <TextInput
                                onChangeText={(e) =>
                                    setInputValues((oldValues) => {
                                        return { ...oldValues, mainPrice: parseFloat(e) }
                                    })}
                                defaultValue={inputValues.mainPrice?.toString()}
                                keyboardType='number-pad'
                                style={[styles.input, { backgroundColor: Colors[colorScheme].itemColor }]}
                                placeholder='Padrão: 0' />

                            <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Secundário: </Text>
                            <TextInput
                                onChangeText={(e) =>
                                    setInputValues((oldValues) => {
                                        return { ...oldValues, secondaryPrice: parseFloat(e) }
                                    })}
                                defaultValue={inputValues.secondaryPrice?.toString()}
                                keyboardType='number-pad'
                                style={[styles.input, { backgroundColor: Colors[colorScheme].itemColor }]}
                                placeholder='Padrão: 0' />
                        </View>
                        <View style={{ borderBottomWidth: 1, marginTop: 16, marginBottom: 8 }} />
                        <View style={{}}>
                            <Text style={[styles.label, { fontWeight: '700' }]}>Custo:</Text>
                            <TextInput
                                onChangeText={(e) =>
                                    setInputValues((oldValues) => {
                                        return { ...oldValues, cost: parseFloat(e) }
                                    })}
                                defaultValue={inputValues.cost?.toString()}
                                keyboardType='number-pad'
                                style={[styles.input, { backgroundColor: Colors[colorScheme].itemColor }]}
                                placeholder='Padrão: 0' />
                        </View>
                    </View>

                </View>
                {
                    id_product &&
                    <View style={{ marginTop: 8 }}>
                        <Button color={Colors.red} title='Deletar produto' onPress={() => setShowModalConfirmation(true)} />
                    </View>
                }
                {
                    showModalConfirmation &&
                    <ConfirmationModal setShowConfirmationModal={setShowModalConfirmation} showConfirmationModal={showModalConfirmation} onConfirm={handleDeleteProduct} />
                }
            </View>
            <ButtonsContainer>
                <CancelButton onPress={() => {
                    navigation.goBack();
                }} />
                <ConfirmButton onPress={handleSubmitForm} />
            </ButtonsContainer>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 8,
        paddingVertical: 16,
        height: '100%',
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
        minWidth: '30%'

    },
    input: {
        // elevation: 4,
        borderColor: Colors.lightGray,
        borderWidth: 1,
        borderRadius: 4,
        flexGrow: 1,
        paddingHorizontal: 8,
        paddingVertical: 8,
    },
    imageSquare: {
        overflow: 'hidden',
        borderRadius: 8,
        aspectRatio: 1 / 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    image: {
        resizeMode: 'contain',
        // backgroundColor: Colors.lightGray,
        height: '100%',
        width: '100%'

    },
    buttons: {
        flexDirection: 'row',
        marginTop: 8,
        alignItems: 'center',
        height: 48,
    },
});
