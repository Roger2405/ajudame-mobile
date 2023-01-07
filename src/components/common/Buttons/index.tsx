

import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';

import { styles } from './styles';

interface GenericButtonProps extends TouchableOpacityProps {
    title: string
    color: string
    iconName?: React.ComponentProps<typeof FontAwesome5>['name'];
    relativePosition?: boolean
}


interface ButtonProps extends GenericButtonProps {
    buttonStyle: 'center' | 'left' | 'right'
}

export default function Button({ title, color, onPress, iconName, buttonStyle }: ButtonProps) {

    const colorScheme = useColorScheme();
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, styles[buttonStyle], { backgroundColor: color }]}>
            <Text style={[styles.text, { color: Colors[colorScheme].text }]}>
                {title}
            </Text>
            {iconName &&
                <ButtonIcon iconName={iconName} color={Colors[colorScheme].background} />
            }
        </TouchableOpacity >
    )
}
function ButtonIcon(props: {
    iconName?: React.ComponentProps<typeof FontAwesome5>['name'];
    color: string
}) {
    return <FontAwesome5 size={32} name={props.iconName} style={{ margin: -5, alignSelf: 'center' }} color={props.color} />;
}


export function SingleButton({ title, color, onPress, iconName }: GenericButtonProps) {
    return (
        <View style={styles.container}>
            <Button buttonStyle='center' title={title} color={color} onPress={onPress}
                iconName={iconName}
            />
        </View>
    );
}

export function DualButtons({ onPress, relativePosition, title, iconName, color }: GenericButtonProps) {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Button buttonStyle='left' title='Voltar' color={Colors.gray} onPress={() => navigation.goBack()}
                iconName='angle-left'
            />
            <Button buttonStyle='right' style={styles.right} title={title} color={color} onPress={onPress}
                iconName={iconName}
            />
        </View>
    )
}
