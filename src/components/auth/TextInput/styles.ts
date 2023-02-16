import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    field: {
        marginBottom: 8,
        width: '100%',
        position: 'relative',
    },
    label: {
        fontWeight: '700',
    },
    input: {
        padding: 8,
        flex: 1,

        // overflow: 'hidden',
    },
    icon: {
        padding: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 4,
        width: '100%'
    },
})