import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        paddingTop: 32,
        // height: 100,
        // position: 'absolute',
        // bottom: 0,
        marginTop: 'auto'
        // paddingHorizontal: 16
    },
    button: {
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 32,
        marginBottom: 16,
        flexGrow: 1,

        elevation: 4,
        shadowOffset: { width: 0, height: -4 },
        shadowRadius: 4,
        borderColor: 'white',
        borderLeftWidth: 2,
        borderRightWidth: 2,
    },
    text: {
        textTransform: 'uppercase',
        marginHorizontal: 16,
        fontWeight: 'bold',
        fontSize: 16
    },
    center: {
        // shadowRadius: 16,
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