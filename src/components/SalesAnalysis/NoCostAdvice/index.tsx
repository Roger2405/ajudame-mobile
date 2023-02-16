import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SaleProductProps } from '../../../@types/sales';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';

interface Props {
    noCostItems: SaleProductProps[]
}
export function NoCostAdvice({ noCostItems }: Props) {

    const colorScheme = useColorScheme();
    const pluralSuffix = noCostItems && (noCostItems?.length) > 1 && 's';
    return (
        <View style={[styles.costInfo, { backgroundColor: Colors.lightRed }]}>
            <Text style={[styles.costInfoMessage, { color: Colors[colorScheme].itemColor }]}>Há {noCostItems?.length} produto{pluralSuffix} nas vendas sem custo informado!</Text>
            <Text style={[styles.costInfoMessage, { backgroundColor: Colors.lightRed, color: Colors[colorScheme].itemColor, marginBottom: 4 }]}>Informe o custo do{pluralSuffix} produto{pluralSuffix}: {noCostItems.map((item, index) => {
                const max_index = 4;
                if (index < max_index)
                    return (index === 0 ? '' : ', ') + item.name_product
                else if (index == max_index) {
                    const rest = noCostItems?.length - index;
                    return ` + ${rest} ite${rest > 1 ? 'ns' : 'm'}`
                }
            })}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    costInfo: {
        borderWidth: 1,
        borderColor: Colors.red,
        borderRadius: 8,
        marginTop: 8,
        paddingHorizontal: 4,
    },
    costInfoMessage: {
        textAlign: 'center',
        paddingVertical: 2,
        borderRadius: 4
    }
})