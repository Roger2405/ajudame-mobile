import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        paddingHorizontal: 16,
        position: 'absolute',
        bottom: 0,
    },
    button: {
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 32,
        marginBottom: 16,
        flexGrow: 1,
    },
    text: {
        textTransform: 'uppercase',
        marginHorizontal: 16,
        // fontWeight: '400'
    },
    center: {

    },
    left: {
        width: '50%',
        flexDirection: 'row-reverse',
        transform: [
            { translateY: -24 },
        ]
    },
    right: {
        width: '50%',
        alignSelf: 'flex-end',
    }
})