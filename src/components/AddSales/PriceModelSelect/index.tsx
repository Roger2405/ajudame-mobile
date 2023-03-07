import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
//ICONS
import { EvilIcons } from '@expo/vector-icons';

import Colors from '../../../constants/Colors';

import { useOrderProducts } from '../../../contexts/order';
import { TouchableHighlight } from 'react-native-gesture-handler';

export function PriceModelSelect() {
    const { priceModel, setPriceModel } = useOrderProducts();
    return (
        <View style={{ alignItems: 'center', width: '50%', position: 'relative' }}>
            <View style={{ width: '100%' }}>
                <Text style={{ color: Colors.gray }}>Modelo de Preço: </Text>
                <View
                    style={{
                        backgroundColor: priceModel == 'main_price' ? Colors.primary : Colors.gray,
                        overflow: 'hidden',
                        borderRadius: 4,
                        flexDirection: 'row', justifyContent: 'space-between'
                    }}
                >
                    <Text style={{ color: Colors.white, fontWeight: 'bold', textAlign: 'center', flex: 1, textAlignVertical: 'center' }}>{priceModel == 'main_price' ? 'Principal' : 'Secundário'}</Text>
                    <TouchableOpacity style={{ backgroundColor: Colors.bgSmooth, padding: 8 }} onPress={() => setPriceModel((oldValue => oldValue == 'main_price' ? 'secondary_price' : 'main_price'))}>
                        <EvilIcons name="retweet" size={24} color={Colors.white} />
                    </TouchableOpacity>

                </View>
            </View>
        </View >
    );
}