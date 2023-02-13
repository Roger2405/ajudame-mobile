import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Switch } from 'react-native';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { OrderProductProps } from '../../@types/orderProduct';
import OrderProducts from '../../components/AddSales/OrderProducts';
import { InputField } from '../../components/auth/TextInput';
import { BackButton, ButtonsContainer, ConfirmButton } from '../../components/common/Buttons';
import Colors from '../../constants/Colors';
import { useOrderProducts } from '../../contexts/order';
import { useProducts } from '../../contexts/products';
import { useRecentSales } from '../../contexts/sales';
import { useStock } from '../../contexts/stock';
import useColorScheme from '../../hooks/useColorScheme';
import { addSale } from '../../services/sales';
import { discountStockOfSaleItems } from '../../services/stock';



export function Summary() {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();
    const [isLoading, setIsLoading] = useState(false);
    const { orderProducts, clearOrderProducts } = useOrderProducts();
    const { updateRecentSalesInContext } = useRecentSales();
    const { updateStockInContext } = useStock();

    const [discountStock, setDiscountStock] = useState<boolean>(true);


    function handleConfirmUpdateSales() {
        setIsLoading(true)
        addSale(orderProducts)
            .then(res => {
                updateRecentSalesInContext();
                clearOrderProducts()
                navigation.navigate('Home')
                if (discountStock) {
                    discountStockOfSaleItems()
                        .then(() => {
                            updateStockInContext()
                        })
                        .catch(alert)
                }
            })
            .catch(alert)
            .finally(() => setIsLoading(false))


    }
    const valueTotal = useMemo(() => {
        let sum = 0;
        orderProducts.forEach(orderProduct => {
            sum += orderProduct.price_product * orderProduct.count;
        })
        return sum;
    }, [orderProducts])
    const total = (valueTotal).toFixed(2).replace('.', ',')
    return (
        <View style={styles.container}>
            {
                isLoading ?

                    <ActivityIndicator size={32} />
                    :
                    <View style={[styles.container, {}]}>
                        <View
                            style={{ flexBasis: '50%' }}
                        >
                            <Text style={{ textAlign: 'center', color: Colors.gray, fontSize: 10 }}>Você ainda pode voltar e editar a venda!</Text>
                            <Text style={{ fontSize: 32, textTransform: 'uppercase', textAlign: 'center', fontWeight: 'bold', color: Colors.gray }}>Pedido</Text>

                            <OrderProducts />
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: 8 }}>
                            <View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ color: Colors.gray }}>descontar {'\n'}estoque</Text>
                                    <Switch
                                        trackColor={{ false: Colors.gray, true: Colors.primary }}
                                        thumbColor={Colors[colorScheme].itemColor}
                                        // style={{ width: 32 }}
                                        ios_backgroundColor={Colors.gray}
                                        onValueChange={() => setDiscountStock(!discountStock)}
                                        value={discountStock}
                                    />
                                </View>
                                <Text style={{ fontSize: 8, color: Colors.gray }}>caso não queira alterar o estoque com {'\n'}essa venda, desabilite a opção acima </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: 24, color: Colors.gray }}>Total:</Text>
                                <Text style={styles.total}>R$ {total}</Text>
                            </View>
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
    },
    total: {
        backgroundColor: Colors.primary,
        marginLeft: 8,
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.white,
        padding: 4,
        borderRadius: 6,
    }
})