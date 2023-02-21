import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { DetailedSaleProps } from '../@types/sales';
import { BackButton, ButtonsContainer } from '../components/common/Buttons';
import { FeedbackMessage } from '../components/common/FeedbackMessage';
import { DetailedSale } from '../components/SalesAnalysis/DetailedSale';
import { useSales } from '../contexts/sales';
import { deleteSale, getDetailedSalesOfDay } from '../services/sales';
import { getCurrentDate } from '../utils/date';


export function DetailedSales() {
    const { sales, updateSales, isLoading } = useSales();
    const [detailedSales, setDetailedSales] = useState<DetailedSaleProps[]>();
    const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'error' | 'info', msg: string }>({} as { type: 'error' | 'info', msg: string });

    useEffect(() => {
        const currentDate = getCurrentDate();
        getDetailedSalesOfDay(currentDate)
            .then((res) => {
                setDetailedSales(res)
            })
    }, [sales])
    useEffect(() => {
        if (detailedSales)
            console.log((detailedSales[0].products))
    }, [detailedSales])
    async function handleDeleteSale(id_sale: number) {
        deleteSale(id_sale)
            .then((res) => {
                setFeedbackMessage({ type: 'info', msg: res as string })
                updateSales()
            })
            .catch(err => {
                setFeedbackMessage({ type: 'error', msg: err })
            })

    }
    return (
        <View style={styles.container} >
            {
                isLoading || !detailedSales ?
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator size={32} />
                    </View>
                    :
                    <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
                        <FeedbackMessage feedbackMessage={feedbackMessage} setFeedbackMessage={setFeedbackMessage} />
                        <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', textTransform: 'uppercase' }}>Vendas do dia</Text>
                        {

                            detailedSales.map(sale => {
                                return (sale ?
                                    <View key={sale.header.datetime} style={{ marginVertical: 4 }}>
                                        <DetailedSale data={sale} handleDeleteSale={handleDeleteSale} />
                                    </View>
                                    :
                                    <></>
                                )
                            })
                        }
                    </ScrollView>
            }
            <ButtonsContainer>
                <BackButton />
            </ButtonsContainer>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 8,
        flex: 1
        // alignItems: 'center'
    }
})