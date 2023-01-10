import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { OrderProductProps } from '../@types/orderProduct';
import { BackButton, ButtonsContainer, ConfirmButton } from '../components/common/Buttons';
import OrderProducts from '../components/common/OrderProducts';
import Colors from '../constants/Colors';



export function Summary() {
    const navigation = useNavigation();
    const [orderProductsFromStorage, setOrderProductsFromStorage] = useState<OrderProductProps[]>([])

    AsyncStorage.getItem('orderProducts').then(str => {
        if (str) {
            const orderProducts = JSON.parse(str);
            setOrderProductsFromStorage(orderProducts);
        }
    })
    return (
        <View style={styles.container}>
            <Text>Resumo</Text>
            <OrderProducts sales={orderProductsFromStorage} />
            {/* <DualButtons title='Continuar' onPress={() => { navigation.navigate('Home') }} color={'green'}
                iconName="angle-right"
            /> */}
            <ButtonsContainer>
                <BackButton />
                <ConfirmButton />
            </ButtonsContainer>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})