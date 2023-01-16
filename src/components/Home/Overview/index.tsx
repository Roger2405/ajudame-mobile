import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { SaleProductProps } from "../../../@types/orderProduct";
import Colors from "../../../constants/Colors";
import useColorScheme from "../../../hooks/useColorScheme";

interface Props {
    salesOfDay: SaleProductProps[]
}

export function OverView({ salesOfDay }: Props) {



    const [sumTotal, setSumTotal] = useState(0);


    const COST_PERCENT = 68.6;

    useEffect(() => {
        setSumTotal(getSumTotal(salesOfDay))
    }, [salesOfDay])

    function getSumTotal(arr: SaleProductProps[]) {
        let sum = 0
        arr.forEach(item => {
            sum += item.count * item.price_product;
        })
        return sum;
    }

    const colorScheme = useColorScheme();
    return (
        <View style={{ width: '100%', marginVertical: 8, borderRadius: 8, overflow: 'hidden' }}>
            <View
                style={{
                    backgroundColor: Colors[colorScheme].itemColor,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    minHeight: 50,
                    alignItems: 'center',
                    padding: 8,

                    borderColor: Colors.lightGray,
                    borderBottomWidth: 8,
                }}>
                <Text
                    style={{
                        textTransform: 'uppercase',
                        fontSize: 24,
                        fontWeight: 'bold',
                        color: Colors.gray,
                    }}>Total:</Text>
                <Text
                    style={{
                        color: Colors[colorScheme].itemColor,
                        backgroundColor: Colors.lightGray,
                        padding: 8,
                        fontSize: 24,
                        fontWeight: 'bold',
                        borderRadius: 8,
                    }}
                >R$ {sumTotal.toFixed(2).replace('.', ',')}</Text>
            </View>
            <View style={{ width: '100%', flexDirection: 'row', height: 20 }}>
                <View style={{ backgroundColor: Colors.red, width: `${COST_PERCENT}%` }} >
                    <Text style={{ textAlign: 'center', color: Colors[colorScheme].textContrast, fontWeight: 'bold' }}>{COST_PERCENT}%</Text>
                </View>
                <View style={{ backgroundColor: Colors.primary, flex: 1 }} >
                    <Text style={{ textAlign: 'center', color: Colors[colorScheme].textContrast, fontWeight: 'bold' }}>31,4%</Text>
                </View>
            </View>
        </View>
    )
}