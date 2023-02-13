import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { SaleProductProps } from "../../../@types/orderProduct";
import { SaleOverviewProps } from "../../../@types/sales";
import Colors from "../../../constants/Colors";
import useColorScheme from "../../../hooks/useColorScheme";
import { getOverview } from "../../../services/sales";

interface Props {
    overviewData: SaleOverviewProps
}

export default function OverView({ overviewData }: Props) {
    const COST_PERCENT = overviewData?.cost ? ((overviewData?.cost / overviewData?.total) * 100) : 0;



    const colorScheme = useColorScheme();
    const backgroundColor = Colors[colorScheme].itemColor
    return (
        <>
            {
                overviewData && overviewData.total &&
                <View style={[styles.container, { backgroundColor }]}>
                    <View style={styles.info}>
                        <View style={styles.group}>
                            <Text style={[styles.label, { fontSize: 20, color: Colors.gray }]}>Total:</Text>
                            <Text style={[styles.value, { backgroundColor: Colors.lightGray, color: Colors.gray, fontSize: 20 }]}>R$ {overviewData?.total?.toFixed(2).replace('.', ',')}</Text>
                        </View>
                        {
                            (overviewData.cost > 0) &&
                            <>
                                <View style={styles.group}>
                                    <Text style={[styles.label, { fontSize: 16, color: Colors.red }]}>Custo:</Text>
                                    <Text style={[styles.value, { color: Colors.red, fontSize: 16 }]}>- R$ {overviewData?.cost?.toFixed(2).replace('.', ',')}</Text>
                                </View>
                                <View style={[styles.group, {}]}>
                                    <Text style={[styles.label, { fontSize: 24, color: Colors.primary }]}>Lucro:</Text>
                                    <Text style={[styles.value, { backgroundColor: Colors.primary, color: Colors.white, fontSize: 24 }]}>R$ {overviewData?.gain?.toFixed(2).replace('.', ',')}</Text>
                                </View>
                            </>
                        }
                    </View>
                    {

                        (overviewData.cost > 0) &&
                        <View style={{ width: '100%', flexDirection: 'row', height: 24 }}>
                            <View style={{ backgroundColor: Colors.red, width: `${COST_PERCENT}%` }} >
                                <Text style={styles.percent}>{COST_PERCENT.toFixed(2)}%</Text>
                            </View>
                            <View style={{ backgroundColor: Colors.primary, flex: 1 }} >
                                <Text style={styles.percent}>{(100 - COST_PERCENT).toFixed(2)}%</Text>
                            </View>
                        </View>
                    }
                </View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 8,
        borderRadius: 8,
        overflow: 'hidden',
    },
    info: {
        borderBottomWidth: 8,
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderColor: Colors.lightGray,
    },
    group: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',

    },
    label: {
        textTransform: "uppercase",
        fontWeight: 'bold'
    },
    value: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        marginVertical: 1,
        borderRadius: 4,
        fontWeight: 'bold',
    },
    percent: {
        textAlign: 'center',
        textAlignVertical: "center",
        borderBottomWidth: 2,
        borderColor: Colors.bgSmooth,
        color: Colors.white,
        lineHeight: 24,
        fontWeight: 'bold'
    }

})