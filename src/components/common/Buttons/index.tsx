

import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { ReactNode } from 'react';
import { View, Text, PressableProps, Pressable, StyleProp, ViewStyle } from 'react-native';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';

import { styles } from './styles';

interface GenericButtonProps extends PressableProps {
    title?: string
    color: string
    icon?: ReactNode;
}


interface ButtonProps extends GenericButtonProps {
    buttonStyle: 'center' | 'left' | 'right'
}

function RoundedButton({ title, color, onPress, icon, buttonStyle, disabled }: ButtonProps) {
    const colorScheme = useColorScheme();
    return (
        <Pressable disabled={disabled} onPress={onPress} style={({ pressed }) => [
            {
                // backgroundColor: pressed ? Colors[colorScheme].background : color,
                opacity: pressed ? 0.5 : 1,
                backgroundColor: color
            }, styles.button, styles[buttonStyle], (disabled && styles.disabled)]}>
            <Text style={[styles.text]}>
                {title}
            </Text>
            {
                icon &&
                icon
            }
        </Pressable >
        // <Pressable onPress={onPress} disabled={disabled} style={[styles.button, styles[buttonStyle], (disabled && styles.disabled), { backgroundColor: color }]}><Text>{title}</Text></Pressable>
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
        <RoundedButton color={Colors.gray} buttonStyle='left' title="Voltar" onPress={() => navigation.goBack()} icon={<Feather size={32} name={'chevron-left'} color={Colors.white} />} />
    )
}
export function CancelButton({ onPress }: PressableProps) {
    return (
        <RoundedButton color={Colors.red} buttonStyle='left' title="Cancelar" onPress={onPress} icon={<Feather size={32} name={'x'} color={Colors.white} />} />
    )
}
export function ContinueButton({ onPress, disabled }: PressableProps) {
    return (
        <RoundedButton color={Colors.primary} disabled={disabled} buttonStyle='right' title="Continuar" onPress={onPress} icon={<Feather size={32} name={'chevron-right'} color={Colors.white} />} />
    )
}
export function ConfirmButton({ onPress, disabled }: PressableProps) {
    return (
        <RoundedButton color={Colors.primary} disabled={disabled} buttonStyle='right' title="Confirmar" onPress={onPress} icon={<Feather size={32} name={'check'} color={Colors.white} />} />
    )
}
export function DeleteButton({ onPress }: PressableProps) {
    return (
        <Pressable style={{ backgroundColor: Colors.red, height: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 4, aspectRatio: 1 / 1 }} onPress={onPress} >
            <Feather size={24} name={'trash'} color={Colors.white} />
        </Pressable>
    )
}

interface ContainerProps {
    children: ReactNode
    style?: StyleProp<ViewStyle>
    relative?: boolean
}
export function ButtonsContainer({ children, style, relative }: ContainerProps) {

    return (
        <View style={[styles.container, { position: relative ? 'relative' : 'absolute' }, style]}>
            {children}
        </View>
    )
}