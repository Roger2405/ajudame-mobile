
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { SaleProductProps } from '../../../@types/orderProduct';
import Colors from '../../../constants/Colors';
import { useRecentSales } from '../../../contexts/sales';
import { deleteSale } from '../../../services/sales';
import { DeleteButton } from '../../common/Buttons';
import ConfirmationModal from '../../common/ConfirmationModal';
import { FeedbackMessage } from '../../common/FeedbackMessage';
import { SalesListItem } from '../../SalesList';

import { styles } from './styles';

interface Props {
    data: SaleProductProps[]
    handleDeleteSale: () => void
}

export function LastSale({ data, handleDeleteSale }: Props) {
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'error' | 'info', msg: string }>({} as { type: 'error' | 'info', msg: string });

    const { updateRecentSalesInContext } = useRecentSales();

    return (
        <>
            <View style={styles.container} >
                {
                    feedbackMessage.msg &&
                    <FeedbackMessage feedbackMessage={feedbackMessage} setFeedbackMessage={setFeedbackMessage} />
                }
                <View style={styles.header}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: Colors.gray }}>
                        Última venda:
                    </Text>
                    <Text style={styles.time}>{(data[0]?.time)}</Text>
                    <DeleteButton onPress={() => {
                        setShowConfirmationModal(true)
                    }} />
                </View>
                <View style={{ paddingTop: 4 }}>
                    {
                        data.map(sale => {
                            return <SalesListItem key={sale.id} item={sale} />
                        })
                    }
                </View>
            </View >

            <ConfirmationModal showConfirmationModal={showConfirmationModal} setShowConfirmationModal={setShowConfirmationModal} onConfirm={() => {
                handleDeleteSale()
                setShowConfirmationModal(false)
            }} />


        </>
    );
}