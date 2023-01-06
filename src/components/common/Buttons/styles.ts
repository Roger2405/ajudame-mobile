import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 16,
        position: 'absolute',
        bottom: 0,
    },
    button: {
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 32,
        marginBottom: 16,
    },
    centerButton: {
        width: '100%',
    },
    text: {
        textTransform: 'uppercase',
        color: Colors.white,
    },
    leftButton: {
        width: '50%',
        transform: [
            { translateY: -24 },
        ]
    },
    rightButton: {
        width: '50%',
        alignSelf: 'flex-end',
    }
})