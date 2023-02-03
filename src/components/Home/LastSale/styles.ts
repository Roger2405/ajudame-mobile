import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';


export const styles = StyleSheet.create({
    container: {
        padding: 4, width: '100%', borderWidth: 2, borderRadius: 8, borderColor: Colors.gray
    },
    header: {
        height: 32, paddingHorizontal: 4, flexDirection: 'row', alignItems: 'center'
    },
    headerInfo: {
        alignItems: 'flex-end', marginLeft: 'auto',
        marginRight: 8,
    },

    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    time: {
        marginLeft: 4,
        color: Colors.lightGray,
        fontWeight: 'bold'
    },
    item: {
        flexDirection: 'row',
        marginTop: 4,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 8,
        maxWidth: '100%',

        borderBottomWidth: 1,
        borderColor: Colors.lightGray

        // elevation: 4,

    },
    itemName: {
        flexBasis: '50%',
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
    },
    text: {
        textTransform: 'uppercase',
        fontSize: 16,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    discountedStock: {
        textAlign: 'left',
        fontSize: 12,
        lineHeight: 16,
        // backgroundColor: Colors.lightGray,
        paddingHorizontal: 4,
        textAlignVertical: 'center',
        fontWeight: '700',
        borderRadius: 4,
    },
    subtotalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 'auto',
    },
    subtotal: {
        backgroundColor: Colors.primary,
        // borderWidth: 1,
        fontSize: 24,
        color: Colors.white,
        marginLeft: 4,
        fontWeight: '700',
        padding: 4,
        borderRadius: 4,
    }
})