import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Text, TextInput, ActivityIndicator, TouchableOpacity, ScrollView, Image, Keyboard, Switch } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInDown, FadeOutDown, Layout } from 'react-native-reanimated';

import useColorScheme from '../../hooks/useColorScheme';
import Colors from '../../constants/Colors';

import { BackButton, ButtonsContainer, CancelButton, ConfirmButton } from '../../components/common/Buttons';
import OrderProducts from '../../components/AddSales/OrderProducts';

//CONTEXTS
import { useOrderProducts } from '../../contexts/order';
import { useSales } from '../../contexts/sales';
import { useStock } from '../../contexts/stock';

import { discountStockOfSaleItems } from '../../services/stock';
import { addSale } from '../../services/sales';
import { PriceModelSelect } from '../../components/AddSales/PriceModelSelect';
import { FlatList } from 'react-native-gesture-handler';
import { MaskedTextInput } from 'react-native-mask-text';
import { TotalValue } from '../../components/AddSales/TotalValue';


const money100 = require('../../../assets/images/money/100.jpg');
const money50 = require('../../../assets/images/money/50.jpg');
const money20 = require('../../../assets/images/money/20.jpg');
const money10 = require('../../../assets/images/money/10.jpg');
const money5 = require('../../../assets/images/money/5.jpg');
const money2 = require('../../../assets/images/money/2.jpg');
const money1 = require('../../../assets/images/money/1.png');
const money05 = require('../../../assets/images/money/0_5.png');

export function Summary() {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();
    const [isLoading, setIsLoading] = useState(false);
    const [paymentValue, setPaymentValue] = useState(0);
    const [keyboardIsHidden, setKeyboardIsHidden] = useState(true);
    const [imgSrcArr, setImgSrcArr] = useState([money100, money50, money20, money10, money5, money2, money1, money05])

    const { orderProducts, clearOrderProducts, priceModel, totalValue } = useOrderProducts();
    const { updateStockInContext } = useStock();
    const { updateSales } = useSales();

    const [discountStock, setDiscountStock] = useState<boolean>(true);

    function handleConfirmUpdateSales() {
        setIsLoading(true)
        addSale(orderProducts, priceModel)
            .then(res => {
                clearOrderProducts()
                if (discountStock) {
                    discountStockOfSaleItems()
                }
            })
            .then(() => {
                updateStockInContext()
            })
            .then(() => updateSales())
            .catch(alert)
            .finally(() => {
                setIsLoading(false)
                navigation.navigate("Root")
            })
    }
    useEffect(() => {
        Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardIsHidden(false);
            }
        );
        Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardIsHidden(true);
            }
        );
    }, [])

    return (
        <View style={styles.container}>
            {
                isLoading ?
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator size={32} />
                    </View>
                    :
                    <View style={[styles.container, { flex: 1, flexBasis: '100%' }]}>
                        <View
                            style={{ flexShrink: 1, flexBasis: '50%' }}
                        >
                            <Text style={{ textAlign: 'center', color: Colors.gray, fontSize: 10 }}>Você ainda pode voltar e adicionar produtos!</Text>
                            <Text style={{ fontSize: 32, textTransform: 'uppercase', textAlign: 'center', fontWeight: 'bold', color: Colors.gray }}>Pedido</Text>

                            <OrderProducts />
                        </View>
                        <ScrollView style={{ flexGrow: 1 }} contentContainerStyle={{ paddingBottom: 120 }}>
                            <View style={[styles.groupContainer, { alignItems: 'flex-start' }]}>
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
                                <PriceModelSelect />
                            </View>
                            <TotalValue relative />


                            <View style={{ borderWidth: 1, borderColor: Colors.gray, paddingVertical: 4, borderRadius: 8, margin: 4 }}>
                                <View style={styles.groupContainer}>
                                    <Text style={[styles.label]}>Valor pago: </Text>
                                    <MaskedTextInput
                                        type="currency"
                                        selection={{ start: 100, end: 100 }}
                                        value={(paymentValue * 100).toString()}
                                        options={{
                                            prefix: 'R$ ',
                                            decimalSeparator: ',',
                                            groupSeparator: '.',
                                            precision: 2,
                                        }}
                                        onChangeText={(value, rawText) => {
                                            setPaymentValue(parseFloat(rawText) / 100)
                                        }}
                                        keyboardType="numeric"
                                        style={styles.paymentInput}
                                    />
                                </View>
                                <FlatList
                                    horizontal style={{ paddingVertical: 4, marginVertical: 4 }} contentContainerStyle={{ paddingHorizontal: 8 }}
                                    data={[100, 50, 20, 10, 5, 2, 1, 0.5]}
                                    keyExtractor={item => item.toString()}
                                    renderItem={({ item, index }) => {
                                        return <TouchableOpacity key={item} style={{ marginLeft: 8, }} onPress={() => setPaymentValue(oldValue => oldValue += item)}>
                                            <Image style={{ resizeMode: 'contain' }} source={imgSrcArr[index]} />
                                        </TouchableOpacity>
                                    }}
                                />
                                {
                                    (paymentValue > totalValue) &&
                                    <View style={[styles.groupContainer, { justifyContent: 'flex-end' }]}>
                                        <Text style={[styles.label, { fontWeight: 'bold', color: Colors[colorScheme].text }]}>Troco:</Text>
                                        <Text style={{ fontSize: 28, fontWeight: 'bold', color: Colors[colorScheme].text, paddingHorizontal: 4, borderRadius: 4, backgroundColor: Colors.lightGray }}>R$ {(paymentValue - totalValue).toFixed(2).replace('.', ',')}</Text>
                                    </View>
                                }
                            </View>
                        </ScrollView>
                        {
                            keyboardIsHidden &&
                            <Animated.View
                                // style={{ position: 'relative', bottom: 0, zIndex: 10 }}
                                layout={Layout}
                                entering={FadeInDown}
                                exiting={FadeOutDown}
                            >

                                <ButtonsContainer>
                                    {
                                        paymentValue > 0 ?
                                            <CancelButton onPress={() => setPaymentValue(0)} />
                                            :
                                            <BackButton />
                                    }
                                    <ConfirmButton disabled={orderProducts.length === 0} onPress={() => handleConfirmUpdateSales()} />
                                </ButtonsContainer>
                            </Animated.View>

                        }
                    </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 4,
    },
    total: {
        backgroundColor: Colors.primary,
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.white,
        padding: 4,
        borderRadius: 6,
    },
    label: {
        fontSize: 20,
        marginRight: 8,
        color: Colors.gray
    },
    groupContainer: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 4,
    },
    paymentInput: { width: 150, padding: 8, fontSize: 20, borderRadius: 4, textAlign: 'right', borderWidth: 1, borderColor: Colors.lightGray }
})