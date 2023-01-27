import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { OrderProductProps } from '../../@types/orderProduct';
import OrderProducts from '../../components/AddSales/OrderProducts';
import { InputField } from '../../components/auth/TextInput';
import { BackButton, ButtonsContainer, ConfirmButton } from '../../components/common/Buttons';
import Colors from '../../constants/Colors';
import { useOrderProducts } from '../../contexts/order';
import { useProducts } from '../../contexts/products';
import { useRecentSales } from '../../contexts/sales';
import useColorScheme from '../../hooks/useColorScheme';
import { updateSalesOnDB } from '../../services/sales';



export function Summary() {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();
    const [isLoading, setIsLoading] = useState(false);
    const { orderProducts, setOrderProducts } = useOrderProducts();
    const { updateRecentSalesInContext } = useRecentSales();
    const { updateProductsInContext } = useProducts();

    const discountStock = true;

    function handleConfirmUpdateSales() {
        setIsLoading(true)
        updateSalesOnDB(orderProducts, discountStock)
            .then(res => {
                console.log(res)
                updateProductsInContext();
                updateRecentSalesInContext();

            })
            .catch(alert)
            .finally(() => setIsLoading(false))


        navigation.navigate('Home')
        setIsLoading(false);
    }

    return (
        <View style={styles.container}>
            {
                isLoading ?

                    <ActivityIndicator size={32} />
                    :
                    <View style={{ flex: 1 }}>
                        <Text style={{ textAlign: 'center', color: Colors.gray, fontSize: 12 }}>Você ainda pode voltar e editar a venda!</Text>
                        <View
                            style={{ flexBasis: '60%' }}
                        >

                            <OrderProducts sales={orderProducts} />
                        </View>
                        <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
                            <Text
                                style={{
                                    textTransform: 'uppercase',
                                    fontSize: 24,
                                    color: Colors.primary,
                                    fontWeight: 'bold',
                                }}>Troco:</Text>
                            <TextInput
                                editable={false}
                                value={'R$ 000,00'}
                                style={{
                                    padding: 4,
                                    backgroundColor: Colors[colorScheme].itemColor,
                                    borderRadius: 4,
                                    marginLeft: 8,
                                    paddingHorizontal: 8,
                                    minWidth: 100,
                                    textAlign: 'right',
                                    fontSize: 20,
                                    borderWidth: 2,
                                    borderColor: Colors.primary,
                                    color: Colors.gray,
                                    fontWeight: 'bold',

                                }} />

                        </View>
                        <ButtonsContainer>
                            <BackButton />
                            <ConfirmButton onPress={() => handleConfirmUpdateSales()} />
                        </ButtonsContainer>
                    </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 8,
        justifyContent: 'center',
    }
})