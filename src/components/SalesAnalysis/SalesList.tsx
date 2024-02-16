import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SaleProductProps } from '../../@types/sales';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';


interface Props {
    salesGroupedByType: SaleProductProps[][]
}

export function SalesList({ salesGroupedByType }: Props) {
    const colorScheme = useColorScheme();
    return (
        <View>
            {
                Object.keys( salesGroupedByType ).map( productType => {
                    return (
                        salesGroupedByType[productType as any].length ?
                        <View key={productType} style={styles.typeContainer}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: Colors[colorScheme].text }}>{productType}</Text>
                            {
                                salesGroupedByType[productType as any].map(item => {
                                    return <SalesListItem item={item} key={item.id} />
                                })
                            }

                        </View>
                        :
                        <></>
                        )
                })
            }
        </View >
    )
}

interface ItemProps {
    item: SaleProductProps
}

export function SalesListItem({ item }: ItemProps) {
    const colorScheme = useColorScheme();
    return (
        <View style={[{ backgroundColor: Colors[colorScheme].itemColor }, styles.item]}>
            <Text
                style={[styles.itemName, styles.text, { flexGrow: 1, color: Colors[colorScheme].text }]}
            >{item.name_product}</Text>
            <Text
                style={[styles.text, styles.itemPrice, { color: Colors[colorScheme].text }]}
            >R$ {item.price_product.toFixed(2)}</Text>
            <Text
                style={[styles.itemCount, { backgroundColor: Colors.bgSmooth, color: Colors[colorScheme].itemColor }]}
            >x {item.count}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: '100%',
    },
    typeContainer: {
        backgroundColor: Colors.lightGray,
        padding: 8,
        marginTop: 8,
        borderRadius: 8
    },
    item: {
        flexDirection: 'row',
        marginTop: 4,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 8,
        maxWidth: '100%',

        borderBottomWidth: 1,
        borderColor: Colors.lightGray
    },
    itemName: {
        flexBasis: '50%',
    },
    itemCount: {
        padding: 4,
        width: 50,
        borderRadius: 16,
        textAlign: 'center',
        fontWeight: '900',
    },
    itemPrice: {
        width: 70,
        marginHorizontal: 8,
        textAlign: 'right',
    },
    text: {
        textTransform: 'uppercase',
        fontSize: 16,
    }
})