import React from "react"
import { ScrollView, View, Text, StyleSheet } from "react-native";

import Colors from "../../constants/Colors";

import { VictoryPie } from "victory-native";

interface Props {
    data: {
        sum: number,
        type: string;
        label: string;
    }[]
}

export function PieChart({ data }: Props) {
    const colors = ['#F1E15B', '#E55454', '#E8C1A0', '#E8A838', '#4597C5', '#444']

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={styles.container}>
                <VictoryPie
                    data={data}
                    y={'sum'}
                    x={'label'}

                    width={300}
                    height={300}

                    labelPlacement={'perpendicular'}
                    labelRadius={110}

                    colorScale={colors}
                    innerRadius={64}
                    padding={48}
                    style={{
                        data: {
                            fillOpacity: 0.9, stroke: Colors.primary, strokeWidth: 2
                        },
                        labels: {
                            fontSize: 12, fill: "white"
                        }
                    }}
                />
                <Text style={{ fontSize: 10, textAlign: "center", color: Colors.white }}>Representação visual da porcentagem dos lucros das vendas, {'\n'}agrupados por tipo/categoria do produto.</Text>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.primary,
        borderRadius: 16,
        marginVertical: 8,
    },
    title: {
        fontSize: 24,
        margin: 10
    }
});