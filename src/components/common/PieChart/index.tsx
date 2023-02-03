import React from "react"
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { VictoryPie } from "victory-native";
import Colors from "../../../constants/Colors";
// import { PieChart } from "react-native-gifted-charts";


interface Props {
    data: {
        sum: number,
        type: string;
        label: string;
    }[]
}

export function PieChartComponent({ data }: Props) {
    const widthAndHeight = 250
    const series = [123, 321, 123, 789, 537]
    const sliceColor = ['#F44336', '#2196F3', '#FFEB3B', '#4CAF50', '#FF9800']
    const colors = ['#F1E15B', '#E55454', '#E8C1A0', '#E8A838', '#4597C5', '#444']
    // const data = [{ value: 50 }, { value: 80 }, { value: 90 }, { value: 70 }]

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={styles.container}>
                {/* <PieChart
                    data={data}
                /> */}
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