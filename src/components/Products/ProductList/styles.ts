
import { StyleSheet } from "react-native";

export const listStyles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },

})
export const itemStyles = StyleSheet.create({
    item: {
        marginTop: 4,
        borderRadius: 4,
        flexDirection: "row",
        position: "relative",
        overflow: "hidden"

    },
    name: {
        fontSize: 16,
        margin: 8,

    },
    prices: {
        marginLeft: 'auto',
        textAlignVertical: "center",
        marginRight: 8,
        justifyContent: "center"
    },
    price: {

    },
    editButton: {
        aspectRatio: 1 / 1,
        alignItems: "center",
        justifyContent: "center",
    }
})