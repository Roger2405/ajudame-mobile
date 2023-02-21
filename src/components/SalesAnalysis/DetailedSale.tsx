

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Feather } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { DetailedSaleProps, SaleProductProps } from '../../@types/sales';
import useColorScheme from '../../hooks/useColorScheme';
import { DeleteButton } from '../common/Buttons';
import ConfirmationModal from '../common/ConfirmationModal';


interface Props {
    data: DetailedSaleProps
    handleDeleteSale: (id_sale: number) => void
}

export function DetailedSale({ data, handleDeleteSale }: Props) {
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const colorScheme = useColorScheme();
    const [formattedTime, setFormattedTime] = useState('')


    useEffect(() => {
        const timeOffset = 3;
        const [strHour, strMin, strSeg] = data.header.datetime.split(':');
        const hour = parseInt(strHour);
        const hourFormatted = (hour < timeOffset ? (24 - (timeOffset - hour)) : (hour - 3)).toString();
        const time = `${hourFormatted}:${strMin}:${strSeg}`;
        setFormattedTime(time)
    }, [])

    return (
        <View style={styles.container} >
            <View style={styles.header}>
                <View>

                    <Text style={{ textTransform: 'uppercase', fontSize: 8, color: Colors[colorScheme].text }}>Modelo de preço</Text>
                    {
                        data.header.is_main_price ?
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.primary, textTransform: 'uppercase' }}>Principal</Text>
                            :
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.gray, textTransform: 'uppercase' }}>Secundário</Text>
                    }
                </View>
                <View style={styles.headerInfo}>
                    <View style={styles.timeContainer}>
                        <Feather name='clock' size={16} color={Colors.lightGray} />
                        <Text style={styles.time}>{(formattedTime)}</Text>
                    </View>
                </View>
                <DeleteButton
                    onPress={() => {
                        setShowConfirmationModal(true)
                    }} />
            </View>
            <View style={{ paddingTop: 4 }}>
                {
                    data.products.map(sale => {
                        return <SaleListItem key={sale.id} item={sale} />
                    })
                }
            </View>
            <View style={styles.footer}>
                {
                    data.header.discounted_stock ?
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Feather name='check' size={32} color={Colors.lightPrimary} />
                            <Text style={[styles.discountedStock, { color: Colors.primary }]}>ESTOQUE{'\n'}ATERADO</Text>
                        </View>
                        :
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Feather name='x' size={32} color={Colors.lightGray} />
                            <Text style={[styles.discountedStock, { color: Colors.gray }]}>ESTOQUE{'\n'}NÃO ATERADO</Text>
                        </View>

                }
                <View style={styles.subtotalContainer}>
                    <Text style={{ textTransform: 'uppercase' }}>Total:</Text>
                    <Text style={styles.subtotal}>R$ {data.header.subtotal?.toFixed(2).replace('.', ',')}</Text>
                </View>
            </View>
            <ConfirmationModal showConfirmationModal={showConfirmationModal} setShowConfirmationModal={setShowConfirmationModal} onConfirm={() => {
                handleDeleteSale(data.header.id_sale)
                setShowConfirmationModal(false)
            }} />
        </View >
    );
}

interface ItemProps {
    item: SaleProductProps
}

export function SaleListItem({ item }: ItemProps) {
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
        padding: 4, width: '100%', borderWidth: 2, borderRadius: 8, borderColor: Colors.gray
    },
    header: {
        height: 32, paddingHorizontal: 4, flexDirection: 'row', alignItems: 'center'
    },
    headerInfo: {
        alignItems: 'flex-end', marginLeft: 'auto',
        marginRight: 8,
    },

    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    time: {
        marginLeft: 4,
        color: Colors.lightGray,
        fontWeight: 'bold'
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

        // elevation: 4,

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
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    discountedStock: {
        textAlign: 'left',
        fontSize: 12,
        lineHeight: 16,
        // backgroundColor: Colors.lightGray,
        paddingHorizontal: 4,
        textAlignVertical: 'center',
        fontWeight: '700',
        borderRadius: 4,
    },
    subtotalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 'auto',
    },
    subtotal: {
        backgroundColor: Colors.primary,
        // borderWidth: 1,
        fontSize: 24,
        color: Colors.white,
        marginLeft: 4,
        fontWeight: '700',
        padding: 4,
        borderRadius: 4,
    }
})