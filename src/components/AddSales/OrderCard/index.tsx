import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { Text, View, Dimensions, Animated, StyleSheet } from "react-native";

import SlidingUpPanel from "rn-sliding-up-panel";
import { OrderProductProps } from "../../../@types/orderProduct";
import Colors from "../../../constants/Colors";
import Layout from "../../../constants/Layout";
import useColorScheme from "../../../hooks/useColorScheme";
import OrderProducts from "../OrderProducts";
import { styles } from "./styles";


interface Props {
    orderProducts: OrderProductProps[]
    setOrderProducts: React.Dispatch<React.SetStateAction<OrderProductProps[]>>
}

export default function OrderCard({ orderProducts, setOrderProducts }: Props) {
    const height = Layout.window.height;
    const draggableRange = { top: height / 2, bottom: 0 }
    const [draggedValue, setDraggedValue] = useState(new Animated.Value(0))
    // var draggedValue = new Animated.Value(-Number.MIN_VALUE);

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
                // snappingPoints={[300]}
                showBackdrop={true}
                allowMomentum={true}
            >
                <View style={[styles.panel, { backgroundColor: Colors[colorScheme].itemColor }]}>
                    <Animated.View />
                    <View
                        style={{
                            alignSelf: "center",
                            borderRadius: 4,
                            marginTop: 4,
                            height: 4,
                            width: 100,
                            backgroundColor: Colors[colorScheme].text
                        }} />
                    <View style={styles.panelHeader}>
                        <Animated.View>
                            <Text style={[styles.textHeader, { color: Colors[colorScheme].text }]}>Pedido</Text>
                        </Animated.View>
                    </View>
                    <View style={{ marginBottom: 160, flex: 1 }}>
                        {
                            orderProducts.length ?
                                <>
                                    <Text style={styles.hint}>Para remover um produto, clique sobre ele!</Text>
                                    <OrderProducts sales={orderProducts} editable setOrderProducts={setOrderProducts} />
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

