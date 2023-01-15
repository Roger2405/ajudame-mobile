import React, { useState } from 'react';
import { View, Button } from 'react-native';
import Colors from '../../constants/Colors';
import { useAuth } from '../../contexts/auth';
import useColorScheme from '../../hooks/useColorScheme';


export function OptionsModal() {
    const [showOptions, setShowOptions] = useState(false);
    const colorScheme = useColorScheme();
    const { signOut } = useAuth();

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