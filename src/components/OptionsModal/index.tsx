import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { TouchableOpacity, View, Button } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';

import { styles } from './styles';

export function OptionsModal() {
    const [showOptions, setShowOptions] = useState(false);
    const colorScheme = useColorScheme();

    return (
        <View style={{ position: 'absolute', top: 24, left: 0, zIndex: 10 }}>
            <TouchableOpacity onPress={() => setShowOptions(!showOptions)} style={{ marginBottom: 12, left: 12 }}>
                <FontAwesome5 size={24} name='ellipsis-v' color={Colors[colorScheme].background} />
            </TouchableOpacity>
            {
                showOptions &&
                <View style={{ backgroundColor: Colors.gray, padding: 8 }}>
                    <Button title='Sair' color={Colors.primary} onPress={() => {
                        AsyncStorage.removeItem('user')
                    }} />
                </View>
            }
        </View >


    );
}