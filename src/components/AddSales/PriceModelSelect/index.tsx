import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
//ICONS
import { EvilIcons } from '@expo/vector-icons';

import Colors from '../../../constants/Colors';

import { useOrderProducts } from '../../../contexts/order';

export function PriceModelSelect() {
    const { priceModel, setPriceModel } = useOrderProducts();
    return (
        <View style={{ alignItems: 'center', flexBasis: '50%', position: 'relative' }}>
            <View style={{ width: '100%' }}>
                <Text>Modelo de Preço: </Text>
                <TouchableOpacity
                    onPress={() => setPriceModel((oldValue => oldValue == 'main' ? 'secondary' : 'main'))}
                    style={{
                        backgroundColor: priceModel == 'main' ? Colors.lightPrimary : Colors.lightRed,
                        borderRadius: 4, padding: 8,
                        flexDirection: 'row', justifyContent: 'space-between'
                    }}>
                    <Text style={{ color: Colors.gray, fontWeight: 'bold' }}>{priceModel == 'main' ? 'Principal' : 'Secundário'}</Text>
                    <EvilIcons name="retweet" size={24} color={Colors.gray} />
                </TouchableOpacity>
            </View>
        </View>
    );
}