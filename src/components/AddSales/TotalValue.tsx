

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import { useOrderProducts } from '../../contexts/order';
import useColorScheme from '../../hooks/useColorScheme';

interface Props {
    relative?: boolean
}
export function TotalValue({ relative }: Props) {
    const colorScheme = useColorScheme();
    const { totalValue } = useOrderProducts();
    return (
        <View style={[styles.container, !relative && styles.absoluteContainer, { backgroundColor: Colors[colorScheme].itemColor }]}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: Colors.gray }}>TOTAL: </Text>
            <Text style={{ textAlign: 'center', fontSize: 32, borderRadius: 24, paddingHorizontal: 16, fontWeight: 'bold', color: Colors.primary, backgroundColor: Colors[colorScheme].background }}>R$ {totalValue.toFixed(2).replace('.', ',')}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row', padding: 4, borderRadius: 24, marginLeft: 'auto'
    },
    absoluteContainer: {
        position: 'absolute', top: -48,
    }
})