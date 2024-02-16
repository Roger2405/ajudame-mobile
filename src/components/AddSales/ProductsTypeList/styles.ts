import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 100,
    },
    grid: {
        position: "relative",
        paddingTop: 16,
        display: "flex",
        gap: 8,
        width: "100%",
        flexWrap: "wrap",
        flexDirection: "row",
        paddingBottom: 48
    },
    item: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        height: 120,
        flexBasis: "40%",
        maxWidth: "50%",
        flexShrink: 1,
        flexGrow: 1,
        aspectRatio: 7 / 5,
        borderRadius: 8,
        overflow: 'hidden'
    },

    itemHeader: {
        flexDirection: 'row',
        height: '30%',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 4,
    },
    itemName: {
        overflow: 'hidden',
        width: '100%',
        padding: 4,
        textTransform: 'uppercase',
    },
    itemCount: {
        height: 32,
        minWidth: 32,
        borderRadius: 16,

        overflow: 'visible',


        position: 'absolute',
        right: 2,
        top: 2,

        textAlign: 'center',
        textAlignVertical: 'center',

        fontWeight: '700',
        fontSize: 16,

        color: Colors.white,
        backgroundColor: Colors.bgSmooth,
    },
    itemBody: {
        flexDirection: 'row',
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    itemImage: {
        aspectRatio: 1 / 1
        // bottom: 0
    },
    itemPrice: {
        position: 'absolute',
        borderTopLeftRadius: 16,
        borderBottomRightRadius: 6,
        // borderRadius: 4,
        margin: 2,
        width: 100,
        padding: 8,
        bottom: 0,
        right: 0,
        textAlign: 'right',
        fontWeight: '900',
    }
})