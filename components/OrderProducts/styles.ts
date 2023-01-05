
import { StyleSheet } from 'react-native';



export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 8,
    },
    item: {
        flexDirection: 'row',
        marginTop: 4,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 8,
        width: '90%',

    },
    itemCount: {
        padding: 4,
        width: 50,
        borderRadius: 16,
        textAlign: 'center',
        fontWeight: '900',
    },
    itemPrice: {
        width: 70,
        marginHorizontal: 8,
        textAlign: 'right',
    }
})