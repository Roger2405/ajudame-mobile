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
                {/* <TouchableHighlight
                    onLongPress={() => setPriceModel((oldValue => oldValue == 'main' ? 'secondary' : 'main'))}
                    underlayColor={Colors.white}
                    style={{

                        backgroundColor: priceModel == 'main' ? Colors.lightPrimary : Colors.lightGray,
                        borderRadius: 4, padding: 8,
                    }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: Colors.gray, fontWeight: 'bold' }}>{priceModel == 'main' ? 'Principal' : 'Secundário'}</Text>
                        <EvilIcons name="retweet" size={24} color={Colors.gray} />
                        </View>
                    </TouchableHighlight> */}
                <View
                    style={{
                        backgroundColor: priceModel == 'main' ? Colors.lightPrimary : Colors.lightGray,
                        overflow: 'hidden',
                        borderRadius: 4,
                        flexDirection: 'row', justifyContent: 'space-between'
                    }}
                >
                    <Text style={{ color: Colors.gray, fontWeight: 'bold', textAlign: 'center', flex: 1, textAlignVertical: 'center' }}>{priceModel == 'main' ? 'Principal' : 'Secundário'}</Text>
                    <TouchableOpacity style={{ backgroundColor: Colors.bgSmooth, padding: 8 }} onPress={() => setPriceModel((oldValue => oldValue == 'main' ? 'secondary' : 'main'))}>
                        <EvilIcons name="retweet" size={24} color={Colors.white} />
                    </TouchableOpacity>

                </View>
            </View>
        </View >
    );
}