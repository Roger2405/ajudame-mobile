
import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

export const listStyles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        marginTop: 8,
    },
    title: {
        fontSize: 20,
        color: Colors.gray,
        textTransform: "uppercase",
        fontWeight: 'bold'
    }

})
export const itemStyles = StyleSheet.create({
    item: {
        marginTop: 4,
        textAlignVertical: 'center',
        borderRadius: 4,
        flexDirection: "row",
        // position: "relative",
        overflow: "hidden",
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 8
    },
    name: {
        color: Colors.gray,
        fontSize: 16,
        marginVertical: 12,
        width: '50%',

    },
    stock: {
        fontWeight: 'bold',
        color: Colors.primary,
        alignSelf: 'center',
        width: 60,
        textAlign: 'right',
        fontSize: 18,
        marginHorizontal: 4,
        paddingHorizontal: 8,
        textAlignVertical: 'center'
    },
    diff: {
        fontWeight: 'bold',
        fontSize: 16,
        marginRight: 8,
    },
    unitButton: {
        height: 32,

        aspectRatio: 1 / 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,

    },
    addButton: {
        backgroundColor: Colors.primary,
    },
    subButton: {
        backgroundColor: Colors.gray,
    }
})