import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';


export const styles = StyleSheet.create({
    container: {
        padding: 4, width: '100%', borderWidth: 2, borderRadius: 8, borderColor: Colors.gray
    },
    header: {
        height: 32, paddingHorizontal: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
    },
    time: {
        marginLeft: 4, marginRight: 16, fontSize: 16, fontWeight: '900'
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
    }
})