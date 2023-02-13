

import { EvilIcons, FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Pressable, View, Text } from 'react-native';
import Colors from '../../../constants/Colors';
import { useOrderProducts } from '../../../contexts/order';
import useColorScheme from '../../../hooks/useColorScheme';

export function PriceModelSelect() {
    const { priceModel, setPriceModel } = useOrderProducts();
    const colorScheme = useColorScheme();
    return (
        <View style={{ alignItems: 'center', flexBasis: '50%', position: 'relative' }}>
            <View style={{ width: '100%' }}>
                <Text>Modelo de Preço: </Text>
                <Pressable
                    onPress={() => setPriceModel((oldValue => oldValue == 'main' ? 'secondary' : 'main'))}
                    style={{
                        backgroundColor: priceModel == 'main' ? Colors.lightPrimary : Colors.lightRed,
                        borderRadius: 4, padding: 8,
                        flexDirection: 'row', justifyContent: 'space-between'
                    }}>
                    <Text style={{ color: Colors.gray, fontWeight: 'bold' }}>{priceModel == 'main' ? 'Principal' : 'Secundário'}</Text>
                    <EvilIcons name="retweet" size={24} color={Colors.gray} />
                </Pressable>
            </View>
        </View>
    );
}