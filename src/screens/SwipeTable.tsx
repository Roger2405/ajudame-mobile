import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { Text, View, Dimensions, Animated, StyleSheet } from "react-native";

import SlidingUpPanel from "rn-sliding-up-panel";
import { OrderProductProps } from "../@types/orderProduct";
import OrderProducts from "../components/common/OrderProducts";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import useColorScheme from "../hooks/useColorScheme";



const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // flexBasis: '70%',
        bottom: Layout.window.height * 0.25,
        right: 0,
        left: 0,
        width: Layout.window.width,
        // height: 300,
        // backgroundColor: "#f8f9fa",
        // alignItems: "center",
        // justifyContent: "center",
        position: "absolute",
    },
    panel: {
        flex: 1,
        position: "relative",
        borderRadius: 16,
        borderWidth: 4,
        marginHorizontal: 4,
    },
    panelHeader: {
        // padding: 16,
        // backgroundColor: Colors.primary
    },
    textHeader: {
        fontSize: 28,
        textAlign: "center",
        fontWeight: 'bold',
        textTransform: "uppercase",
        color: "#FFF"
    },
});

interface Props {
    orderProducts: OrderProductProps[]
    setOrderProducts: React.Dispatch<React.SetStateAction<OrderProductProps[]>>
}

export function BottomSheet({ orderProducts, setOrderProducts }: Props) {
    const height = Layout.window.height;
    const draggableRange = { top: height / 2, bottom: 0 }
    // const [draggedValue, setDraggedValue] = useState(new Animated.Value(180))
    var draggedValue = new Animated.Value(-Number.MIN_VALUE);

    var panel: SlidingUpPanel | null = {} as SlidingUpPanel;
    // panel?.show(360);
    const { top, bottom } = { top: height, bottom: 0 };

    useEffect(() => {
        panel?.show &&
            panel?.show(-Number.MIN_VALUE)

    }, [])
    const colorScheme = useColorScheme();
    return (
        <View style={styles.container} >
            <SlidingUpPanel
                ref={c => {
                    (panel = c)
                }}
                draggableRange={draggableRange}
                animatedValue={draggedValue}
                snappingPoints={[360]}
                allowMomentum={false}
            >
                <View style={[styles.panel, { backgroundColor: Colors[colorScheme].background, borderColor: Colors[colorScheme].itemColor }]}>
                    <Animated.View />
                    <View
                        style={{
                            borderTopWidth: 0,
                            width: 100,
                            alignSelf: "center",
                            marginTop: 4,
                            borderColor: Colors[colorScheme].text,
                            height: 4,
                            borderRadius: 4,
                            backgroundColor: Colors[colorScheme].text
                        }} />
                    <View style={styles.panelHeader}>
                        <Animated.View>
                            <Text style={[styles.textHeader, { color: Colors[colorScheme].text }]}>Pedido</Text>
                        </Animated.View>
                    </View>
                    <View style={{ paddingHorizontal: 8, backgroundColor: Colors[colorScheme].background, flex: 1 }}>
                        {
                            orderProducts.length ?
                                <>
                                    <OrderProducts sales={orderProducts} editable setOrderProducts={setOrderProducts} />
                                    <Text>Para eliminar produtos do pedido, basta dar um clique sobre</Text>
                                </>
                                :
                                <Text style={{ textAlign: "center", color: Colors[colorScheme].text }}>Adicione algum produto!</Text>
                        }

                    </View>
                </View>
            </SlidingUpPanel>
        </View >
    );
}


export default BottomSheet;
