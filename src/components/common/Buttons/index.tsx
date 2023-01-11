

import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { ReactNode } from 'react';
import { View, Text, TouchableOpacity, Button, TouchableOpacityProps, Pressable } from 'react-native';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';

import { styles } from './styles';

interface GenericButtonProps extends TouchableOpacityProps {
    title?: string
    color: string
    icon?: ReactNode;
}


interface ButtonProps extends GenericButtonProps {
    buttonStyle: 'center' | 'left' | 'right'
}

function RoundedButton({ title, color, onPress, icon, buttonStyle }: ButtonProps) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, styles[buttonStyle], { backgroundColor: color }]}>
            <Text style={[styles.text, { color: Colors.white }]}>
                {title}
            </Text>
            {icon &&
                icon
            }
        </TouchableOpacity >
    )
}

export function SingleButton({ title, color, onPress, icon }: GenericButtonProps) {
    return (
        <View style={styles.container}>
            <RoundedButton buttonStyle='center' title={title} color={color} onPress={onPress}
                icon={icon}
            />
        </View>
    );
}

export function BackButton() {
    const navigation = useNavigation();
    return (
        <RoundedButton color={Colors.gray} buttonStyle='left' title="Voltar" onPress={() => navigation.goBack()} icon={<FontAwesome5 size={32} name={'angle-left'} color={Colors.white} />} />
    )
}
export function CancelButton({ onPress }: TouchableOpacityProps) {
    return (
        <RoundedButton color={Colors.red} buttonStyle='left' title="Cancelar" onPress={onPress} icon={<Feather size={32} name={'x'} color={Colors.white} />} />
    )
}
export function ContinueButton({ onPress }: TouchableOpacityProps) {
    return (
        <RoundedButton color={Colors.primary} buttonStyle='right' title="Continuar" onPress={onPress} icon={<FontAwesome5 size={32} name={'angle-right'} color={Colors.white} />} />
    )
}
export function ConfirmButton({ onPress }: TouchableOpacityProps) {
    return (
        <RoundedButton color={Colors.primary} buttonStyle='right' title="Confirmar" onPress={onPress} icon={<FontAwesome5 size={32} name={'check'} color={Colors.white} />} />
    )
}
export function DeleteButton({ onPress }: TouchableOpacityProps) {
    return (
        <Pressable style={{ backgroundColor: Colors.red, height: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 4, aspectRatio: 1 / 1 }} onPress={onPress} >
            <FontAwesome5 size={24} name={'trash'} color={Colors.white} />
        </Pressable>
    )
}

interface ContainerProps {
    children: ReactNode
}
export function ButtonsContainer({ children }: ContainerProps) {

    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}