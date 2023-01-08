import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { TouchableOpacity, View, Button } from 'react-native';
import Colors from '../../constants/Colors';
import AuthContext from '../../contexts/auth';
import useColorScheme from '../../hooks/useColorScheme';

import { styles } from './styles';

export function OptionsModal() {
    const [showOptions, setShowOptions] = useState(false);
    const colorScheme = useColorScheme();
    const { signOut } = useContext(AuthContext);

    function handleSignOut() {
        signOut()
    }

    return (
        <View style={{ position: 'absolute', top: 24, left: 0, zIndex: 10 }}>
            <View style={{ backgroundColor: Colors.gray, padding: 8 }}>
                <Button title='Sair' color={Colors.primary} onPress={handleSignOut} />
            </View>
        </View >


    );
}