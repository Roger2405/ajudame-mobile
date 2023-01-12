import Layout from "../../../constants/Layout";
import { StyleSheet } from 'react-native';
import Colors from "../../../constants/Colors";

export const styles = StyleSheet.create({
    container: {
        right: 0,
        bottom: Layout.window.height * 0.25,

        width: Layout.window.width,
        position: "absolute",
    },
    panel: {
        flex: 1,
        position: "relative",
        borderRadius: 8,
        padding: 8,
        marginHorizontal: 4,

        borderWidth: 2,
        borderColor: Colors.gray,

        elevation: 16,
        shadowOffset: { width: 0, height: -16 },
        shadowRadius: 16,
    },
    hint: {
        fontSize: 12,
        color: Colors.gray,
        textAlign: "center"
    },
    panelHeader: {
        alignSelf: "center",
        paddingHorizontal: 8,
        marginTop: 4,
    },
    textHeader: {
        fontSize: 28,
        textAlign: "center",
        fontWeight: 'bold',
        textTransform: "uppercase",
        color: "#FFF"
    },
});