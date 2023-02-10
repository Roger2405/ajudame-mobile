
import React, { ReactNode, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Button, ActivityIndicator } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import * as ImagePicker from 'expo-image-picker';
import { ButtonsContainer, CancelButton, ConfirmButton, DeleteButton } from '../components/common/Buttons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { addProduct, deleteProduct, getProduct, getProductTypes, updateProduct } from '../services/products';
import { useProducts } from '../contexts/products';
import { useStock } from '../contexts/stock';
import { RootStackParamList } from '../../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProductDetailsProps, ProductProps } from '../@types/product';
import api from '../services/api';
import ConfirmationModal from '../components/common/ConfirmationModal';
//@ts-ignore
import DatalistInput from '@avul/react-native-datalist-input';
import { FeedbackMessage } from '../components/common/FeedbackMessage';
import { useRecentSales } from '../contexts/sales';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductForm'>;

export default function ProductForm({ route }: Props) {
    const id_product = route.params.id;
    const [inputValues, setInputValues] = useState<ProductDetailsProps>({} as ProductDetailsProps)
    const [productData, setProductData] = useState<ProductDetailsProps>({} as ProductDetailsProps);


    const colorScheme = useColorScheme();
    // const [photo, setPhoto] = useState<ImagePicker.ImagePickerAsset | null>();
    const navigation = useNavigation();
    const [showModalConfirmation, setShowModalConfirmation] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'error' | 'info', msg: string }>({} as { type: 'error' | 'info', msg: string });

    const { productTypes, updateProductsInContext } = useProducts();
    const { updateStockInContext } = useStock();
    const { updateRecentSalesInContext } = useRecentSales();

    useEffect(() => {
        if (id_product) {
            setIsLoading(true)
            getProduct(id_product)
                .then(data => {
                    const { image_path } = data;
                    const fullImagePath = `${api.defaults.baseURL}${image_path}`;
                    console.log('estoque: ', data.stock)
                    console.log(data)
                    setProductData(() => {
                        return { ...data, image_path: fullImagePath }
                    })
                })
        }
    }, [])
    useEffect(() => {
        if (productData) {
            setInputValues(() => {
                return { ...productData } as ProductDetailsProps
            })
            setIsLoading(false)
        }
    }, [productData])

    async function handleSubmitForm() {
        const { name_product, type_product, main_price, image_path, secondary_price, cost, stock } = inputValues;

        if (!!name_product && !!type_product && !!main_price) {

            let formData = new FormData();

            formData.append('name_product', name_product)
            formData.append('type_product', type_product)
            formData.append('main_price', main_price.toString())
            formData.append('secondary_price', (secondary_price || 0).toString())

            const stockChanged = stock !== undefined;
            const costChanged = cost !== undefined;
            costChanged &&
                formData.append('cost', cost?.toString())
            stockChanged &&
                formData.append('stock', stock?.toString())

            if (image_path !== productData.image_path && !!image_path) {
                let localUri = image_path;
                let filename = localUri.split('/').pop();

                if (filename) {
                    let match = /\.(\w+)$/.exec(filename);
                    let type = match ? `image/${match[1]}` : `image`;
                    // @ts-ignore
                    formData.append('image', { uri: localUri, name: filename, type });
                }
            }
            //se houver o id do produto é chamada a função para editá-lo, caso contrário, é adicionado no bd
            const response = await (id_product ? updateProduct(formData, id_product) : addProduct(formData))

            if (response.success) {
                updateProductsInContext();
                if (stockChanged)
                    updateStockInContext();
                if (costChanged)
                    updateRecentSalesInContext()
                navigation.navigate('Products')

            }
            else {
                setFeedbackMessage({ msg: 'Ocorreu algum erro!', type: 'error' })
            }

        }
        else {
            setFeedbackMessage({ msg: 'Preencha os campos obrigatórios', type: 'error' })
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
                setInputValues(oldValues => { return { ...oldValues, image_path: path } })
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
    const backgroundColor = Colors[colorScheme].itemColor;
    const color = Colors[colorScheme].text;

    const editableCost = productData.editable_cost == 1 || productData.editable_cost == undefined;
    return (

        isLoading ?
            <View style={[styles.container, { justifyContent: 'center' }]}>
                <ActivityIndicator />
            </View>
            :

            <View style={styles.container}>
                <FeedbackMessage feedbackMessage={feedbackMessage} setFeedbackMessage={setFeedbackMessage} />
                <View>
                    <View>
                        <View style={styles.group}>
                            <Text style={[styles.label, { color }]}>Nome: </Text>
                            <Text style={styles.required}>Campo Obrigatório</Text>
                            <TextInput
                                defaultValue={inputValues.name_product}
                                onChangeText={(e) =>
                                    setInputValues((oldValues) => {
                                        return { ...oldValues, name_product: e }
                                    })}
                                style={[styles.input, { backgroundColor }]} placeholder='Nome do produto' />
                        </View>
                        <View style={styles.group}>
                            <Text style={[styles.label, { color }]}>Categoria: *</Text>
                            <DatalistInput
                                containerStyle={[styles.input, { backgroundColor }]}
                                value={inputValues.type_product}
                                onChangeText={(text: string) => setInputValues(oldValues => { return { ...oldValues, type_product: text } })}
                                data={productTypes}
                                style={{ borderWidth: 0, padding: 0 }}
                                placeholder="Insira uma categoria"
                                placeholderTextColor={Colors.lightGray}
                            />
                        </View>
                        <View style={styles.group}>
                            <Text style={[styles.label, { color }]}>Estoque: *</Text>
                            <TextInput
                                defaultValue={inputValues.stock?.toString()}
                                onChangeText={(e) =>
                                    setInputValues((oldValues) => {
                                        return { ...oldValues, stock: parseInt(e) }
                                    })} style={[styles.input, { backgroundColor }]} placeholder='Quantidade em estoque' />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 16 }}>
                        <View style={{ flex: 1, marginRight: 4 }}>

                            <View style={[styles.imageSquare]}>
                                {
                                    inputValues.image_path ? <Image source={{ uri: inputValues.image_path }} style={styles.image} />
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
                                <Text style={[styles.label, { color }]}>Principal: *</Text>
                                <TextInput
                                    onChangeText={(e) =>
                                        setInputValues((oldValues) => {
                                            return { ...oldValues, main_price: parseFloat(e) }
                                        })}
                                    defaultValue={inputValues.main_price?.toString()}
                                    keyboardType='number-pad'
                                    style={[styles.input, { backgroundColor }]}
                                    placeholder='Padrão: 0' />

                                <Text style={[styles.label, { color }]}>Secundário: </Text>
                                <TextInput
                                    onChangeText={(e) =>
                                        setInputValues((oldValues) => {
                                            return { ...oldValues, secondary_price: parseFloat(e) }
                                        })}
                                    defaultValue={inputValues.secondary_price?.toString()}
                                    keyboardType='number-pad'
                                    style={[styles.input, { backgroundColor }]}
                                    placeholder='Padrão: 0' />
                            </View>
                            <View style={{ borderBottomWidth: 1, marginTop: 16, marginBottom: 8 }} />
                            <View style={{}}>
                                <Text style={[styles.label, { fontWeight: '700' }]}>Custo:</Text>
                                <TextInput
                                    editable={!!editableCost}
                                    onChangeText={(e) =>
                                        setInputValues((oldValues) => {
                                            return { ...oldValues, cost: parseFloat(e) }
                                        })}
                                    defaultValue={inputValues.cost?.toString()}
                                    keyboardType='number-pad'
                                    style={[styles.input, { backgroundColor: editableCost ? backgroundColor : Colors[colorScheme].background }]}
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
    datalist: {
        // position: 'absolute',
        // bottom: 0,
        // height: 'auto'

    },
    label: {
        textTransform: 'uppercase',
        fontSize: 16,
        paddingRight: 16,
        minWidth: '40%'

    },
    required: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: Colors.lightGray,

    },
    input: {
        // elevation: 4,
        borderColor: Colors.lightGray,
        borderWidth: 1,
        borderRadius: 4,
        minHeight: 48,
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
