

import { NavigationContainerProps, NavigationProp } from '@react-navigation/native';
import React, { ReactNode } from 'react';
import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { styles } from './styles';

interface SingleButtonProps extends TouchableOpacityProps {
    children?: ReactNode
    color: string
}

export function SingleButton({ children, color, onPress }: SingleButtonProps) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress} style={[styles.button, styles.centerButton, { backgroundColor: color }]}>
                <Text style={styles.text}>
                    {children}
                </Text>
            </TouchableOpacity >
        </View>
    );
}

interface Buttons extends TouchableOpacityProps {
    leftButtonColor: string,
    rightButtonColor: string,
    navigation: any
}

export function Buttons({ leftButtonColor, rightButtonColor, onPress, navigation }: Buttons) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.button, styles.leftButton, { backgroundColor: leftButtonColor }]}>
                <Text style={styles.text}>Voltar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { }} style={[styles.button, styles.rightButton, { backgroundColor: rightButtonColor }]}>
                <Text style={styles.text}>Teste</Text>
            </TouchableOpacity>
        </View>
    )
}