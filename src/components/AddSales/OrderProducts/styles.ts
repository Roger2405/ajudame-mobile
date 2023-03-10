import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';


export const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    item: {
        height: 48,
        flexDirection: 'row',
        marginTop: 4,
        overflow: 'hidden',
        // padding: 8,
        alignItems: 'center',
        // justifyContent: 'space-between',
        borderRadius: 4,
        maxWidth: '100%',

        borderBottomWidth: 1,
        borderColor: Colors.lightGray

        // elevation: 4,

    },
    itemName: {
        fontWeight: 'bold',
        fontSize: 12,
        // color: Colors.lightGray,
        // marginLeft: 4,
    },
    itemCount: {
        // padding: 4,
        width: 40,
        // borderRadius: 16,
        textAlign: 'center',
        fontWeight: '900',
    },
    buttonCount: {
        backgroundColor: Colors.lightGray,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.gray
    },
    itemSubtotal: {
        paddingRight: 8,
        flexBasis: 88,
        flex: 1,
        // marginHorizontal: 8,
        color: Colors.primary,
        fontWeight: 'bold',
        textAlign: 'right',
    },
    text: {
        textTransform: 'uppercase',
    }
})