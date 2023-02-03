
import React from 'react';
import { View, Text } from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';

interface Props {
    data: {
        name: string,
        sum: Number,
        color: string,
        legendFontColor: string,
        legendFontSize: number,
    }[]
}

export function PieChartKitComponent({ data }: Props) {

    return (
        <PieChart
            data={data}
            fromZero
            width={Layout.window.width - 16}
            height={220}
            chartConfig={{
                color: () => `rgba(0, 0, 0, 0)`,
                decimalPlaces: 2,
            }}
            hasLegend={false}
            style={{
                marginVertical: 8,
                borderRadius: 16,
            }}

            accessor="sum"
            backgroundColor={Colors.primary}
            paddingLeft="0"
            absolute //for the absolute number remove if you want percentage
        />
    );
}