
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
        position: "relative",
        overflow: "hidden",
        width: '100%'

    },
    name: {
        fontSize: 16,
        margin: 8,
        marginVertical: 12,

    },
    prices: {
        marginLeft: 'auto',
        textAlignVertical: "center",
        marginRight: 8,
        justifyContent: "center",
        alignItems: "flex-end"
    },
    price: {
        fontSize: 16,

    },
    editButton: {
        aspectRatio: 1 / 1,
        alignItems: "center",
        justifyContent: "center",
    }
})