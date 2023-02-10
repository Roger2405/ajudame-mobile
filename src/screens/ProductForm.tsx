import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Button, ActivityIndicator, Switch, FlatList } from 'react-native';
//hooks
import { useNavigation } from '@react-navigation/native';
import useColorScheme from '../hooks/useColorScheme';
//react navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Colors from '../constants/Colors';

import { RootStackParamList } from '../../types';
import { ProductDetailsProps } from '../@types/product';

import api from '../services/api';
import { addProduct, deleteProduct, getProduct, updateProduct } from '../services/products';

import { useProducts } from '../contexts/products';
import { useStock } from '../contexts/stock';
import { useRecentSales } from '../contexts/sales';

import * as ImagePicker from 'expo-image-picker';
import { FontAwesome5 } from '@expo/vector-icons';

import { ButtonsContainer, CancelButton, ConfirmButton, DeleteButton } from '../components/common/Buttons';
import { FeedbackMessage } from '../components/common/FeedbackMessage';
import ConfirmationModal from '../components/common/ConfirmationModal';

// @ts-ignore
import DatalistInput from '@avul/react-native-datalist-input';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductForm'>;

export default function ProductForm({ route }: Props) {
    const id_product = route.params.id;

    const [updateCostInSales, setUpdateCostInSales] = useState<boolean>();

    const [inputValues, setInputValues] = useState<ProductDetailsProps>({} as ProductDetailsProps)
    const [productData, setProductData] = useState<ProductDetailsProps>({} as ProductDetailsProps);

    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    const [showModalConfirmation, setShowModalConfirmation] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'error' | 'info', msg: string }>({} as { type: 'error' | 'info', msg: string });
    //data from contexts
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
                    setProductData(() => {
                        return { ...data, image_path: image_path ? fullImagePath : undefined }
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

            console.log('custo input', cost)
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
                            <Text style={styles.required}>(obrigatório)</Text>
                            <TextInput
                                defaultValue={inputValues.name_product}
                                onChangeText={(e) =>
                                    setInputValues((oldValues) => {
                                        return { ...oldValues, name_product: e }
                                    })}
                                style={[styles.input, { backgroundColor }]} placeholder='Nome do produto' />
                        </View>
                        <View style={styles.group}>
                            <Text style={[styles.label, { color, alignSelf: 'flex-start', marginVertical: 8 }]}>Categoria:</Text>
                            <Text style={styles.required}>(obrigatório)</Text>
                            <View style={{ flexGrow: 1 }}>
                                <TextInput
                                    defaultValue={inputValues.type_product?.toString()}
                                    value={inputValues.type_product?.toString()}
                                    onChangeText={(e) =>
                                        setInputValues((oldValues) => {
                                            return { ...oldValues, type_product: e }
                                        })} style={[styles.input, { backgroundColor }]} placeholder='Categoria do produto' />
                                <FlatList
                                    data={productTypes}
                                    keyExtractor={item => item}
                                    contentContainerStyle={{ paddingVertical: 8 }}
                                    style={[{ maxHeight: 64 }]}
                                    renderItem={({ item }) =>
                                        <TouchableOpacity
                                            onPress={() => setInputValues(oldValues => { return { ...oldValues, type_product: item } })}
                                            style={[{ padding: 8, borderRadius: 4, marginTop: 2, backgroundColor }]}>
                                            <Text>{item}</Text>
                                        </TouchableOpacity>
                                    }
                                />

                            </View>
                        </View>
                        <View style={styles.group}>
                            <Text style={[styles.label, { color }]}>Estoque:</Text>
                            <TextInput
                                defaultValue={(inputValues.stock || 0).toString()}
                                onChangeText={(e) =>
                                    setInputValues((oldValues) => {
                                        return { ...oldValues, stock: parseInt(e) }
                                    })} style={[styles.input, { backgroundColor }]} placeholder='Quantidade em estoque' />
                        </View>
                    </View>
                    {/* IMAGEM */}
                    <View style={{ flexDirection: 'row', marginTop: 16 }}>
                        <View style={{ flex: 1, marginRight: 4 }}>

                            <View style={[styles.imageSquare]}>
                                {
                                    inputValues.image_path ? <Image source={{ uri: inputValues.image_path }} style={styles.image} />
                                        :
                                        <FontAwesome5 color={Colors.gray} name='image' size={128} />}
                            </View>
                            <View style={styles.buttons}>
                                <DeleteButton onPress={() => { setInputValues(oldValues => { return { ...oldValues, image_path: null } }) }} accessibilityLabel='Remover imagem do produto' />
                                <TouchableOpacity style={{ backgroundColor: Colors.primary, marginLeft: 4, borderRadius: 4, height: '100%', flexGrow: 1, alignItems: 'center', justifyContent: 'center' }} onPress={handleChoosePhoto} >
                                    <Text style={{ textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase', color: Colors[colorScheme].textContrast }}>Escolher{'\n'}Imagem</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* PREÇOS $$$ */}
                        <View style={{ flex: 1, marginLeft: 4 }}>
                            <View style={{}}>
                                <Text style={[styles.label, { fontWeight: '700' }]}>Preços</Text>

                                <View>
                                    <Text style={[styles.label, { color }]}>Principal: </Text>
                                    <Text style={styles.required}>(obrigatório)</Text>
                                    <TextInput
                                        onChangeText={(e) =>
                                            setInputValues((oldValues) => {
                                                const newValue = parseFloat(e);
                                                return { ...oldValues, main_price: (isNaN(newValue) ? 0 : newValue) }
                                            })}
                                        defaultValue={(inputValues.main_price || 0).toString()}
                                        keyboardType='number-pad'
                                        style={[styles.input, { backgroundColor }]}
                                        placeholder='Padrão: 0' />
                                </View>

                                <View>
                                    <Text style={[styles.label, { color }]}>Secundário: </Text>
                                    <TextInput
                                        onChangeText={(e) =>
                                            setInputValues((oldValues) => {
                                                const newValue = parseFloat(e);
                                                return { ...oldValues, secondary_price: (isNaN(newValue) ? undefined : newValue) }
                                            })}
                                        defaultValue={inputValues.secondary_price?.toString()}
                                        keyboardType='number-pad'
                                        style={[styles.input, { backgroundColor }]}
                                        placeholder='Padrão: 0' />
                                </View>
                            </View>
                            {/* CUSTO  */}
                            <View style={{ borderBottomWidth: 1, marginTop: 16, marginBottom: 8 }} />
                            <View style={{}}>
                                <Text style={[styles.label, { fontWeight: '700' }]}>Custo:</Text>
                                <TextInput
                                    editable={!!editableCost}
                                    onChangeText={(e) =>
                                        setInputValues((oldValues) => {
                                            const newValue = parseFloat(e);
                                            return { ...oldValues, cost: (isNaN(newValue) ? undefined : newValue) }
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
                        <>
                            {
                                productData.cost == undefined && inputValues.cost !== null &&
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Switch
                                        trackColor={{ false: Colors.gray, true: Colors.primary }}
                                        thumbColor={updateCostInSales ? Colors.white : Colors[colorScheme].background}
                                        ios_backgroundColor={Colors.gray}
                                        onValueChange={() => setUpdateCostInSales(!updateCostInSales)} value={updateCostInSales} />
                                    <Text style={{ fontSize: 12, flex: 1 }}>Atualizar o custo em todas as vendas já registradas com esse produto sem o custo informado!</Text>
                                </View>
                            }
                            <View style={{ marginTop: 8 }}>
                                <Button color={Colors.red} title='Deletar produto' onPress={() => setShowModalConfirmation(true)} />
                            </View>
                        </>
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
        borderBottomWidth: 1,
        borderColor: Colors.lightGray,
        // paddingTop: 4,
        // marginTop: 4,
        paddingBottom: 4,
        marginBottom: 4,

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
        right: 0,
        bottom: 0,
        zIndex: 10,
        fontSize: 8,
        margin: 4,

    },
    input: {
        // elevation: 4,
        // maxWidth: 200,
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
