
import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { LastSaleProductProps, SaleProductProps } from '../../../@types/orderProduct';
import Colors from '../../../constants/Colors';
import { useRecentSales } from '../../../contexts/sales';
import useColorScheme from '../../../hooks/useColorScheme';
import { DeleteButton } from '../../common/Buttons';
import ConfirmationModal from '../../common/ConfirmationModal';
import { FeedbackMessage } from '../../common/FeedbackMessage';

import { styles } from './styles';

interface Props {
    data: LastSaleProductProps
    handleDeleteSale: () => void
}

export function LastSale({ data, handleDeleteSale }: Props) {
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);


    return (
        <View style={styles.container} >
            <View style={styles.header}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: Colors.gray }}>
                    Última venda:
                </Text>
                <View style={{ alignItems: 'flex-end' }}>
                    <Text style={{ lineHeight: 16 }}>{!!data.header.discounted_stock ? 'estoque descontado' : 'nops'}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Feather name='clock' size={16} color={Colors.lightGray} />
                        <Text style={[styles.time, { color: Colors.lightGray }]}>{(data.header.time)}</Text>
                    </View>
                </View>
                <DeleteButton onPress={() => {
                    setShowConfirmationModal(true)
                }} />
            </View>
            <View style={{ paddingTop: 4 }}>
                {
                    data.products.map(sale => {
                        return <LastSalesListItem key={sale.id} item={sale} />
                    })
                }
            </View>
            <ConfirmationModal showConfirmationModal={showConfirmationModal} setShowConfirmationModal={setShowConfirmationModal} onConfirm={() => {
                handleDeleteSale()
                setShowConfirmationModal(false)
            }} />
        </View >


    );
}

interface ItemProps {
    item: SaleProductProps
}

export function LastSalesListItem({ item }: ItemProps) {
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