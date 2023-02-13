
import { EvilIcons, Feather, FontAwesome5 } from '@expo/vector-icons';
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
    const colorScheme = useColorScheme();


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
                        <Text style={styles.time}>{(data.header.time)}</Text>
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
                        return <LastSalesListItem key={sale.id} item={sale} />
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
                    <Text style={styles.subtotal}>R$ {data.header.subtotal.toFixed(2).replace('.', ',')}</Text>
                </View>
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