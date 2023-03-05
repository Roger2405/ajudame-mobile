import { styles } from './styles';

import React, { memo } from 'react';
import { View, Image, Text, FlatList, Pressable, TouchableOpacity, ScrollView } from 'react-native';

import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
//TYPES
import { ProductProps } from '../../../@types/product';
//CONTEXTS
import { useOrderProducts } from '../../../contexts/order';
import { useStock } from '../../../contexts/stock';

import api from '../../../services/api';

interface Props {
    productsArr: ProductProps[]
    setModal: React.Dispatch<React.SetStateAction<{
        showModal: boolean;
        options: {
            product: ProductProps;
            type: 'add' | 'sub';
            initialCount?: number;
        };
    }>>
}
export const ProductTypeListMemo = memo(ProductsTypeList)

function ProductsTypeList({ productsArr, setModal }: Props) {
    const colorScheme = useColorScheme();
    const { orderProducts, addProductToOrder, priceModel } = useOrderProducts();

    return (
        <View>
            <Text style={{ fontWeight: '700', fontSize: 24, color: Colors[colorScheme].text }}>{productsArr[0].type_product}</Text>
            <ScrollView
                horizontal
                style={styles.grid}
            >
                {
                    productsArr.map(product => {
                        const index = orderProducts.findIndex(item => item.id_product == product.id)
                        var product_count = (orderProducts[index]?.count);
                        return <Item key={product.id} product_count={product_count} product={product} setModal={setModal} />
                    })
                }
            </ScrollView>
        </View>
    );
}

const Item = memo(ProductItem);

interface ItemProps {
    product: ProductProps
    setModal: React.Dispatch<React.SetStateAction<{
        showModal: boolean;
        options: {
            product: ProductProps;
            type: 'add' | 'sub';
            initialCount?: number;
        };
    }>>
    product_count: number
}

function ProductItem({ product, product_count, setModal }: ItemProps) {
    const { orderProducts, addProductToOrder, priceModel } = useOrderProducts();
    const { stock } = useStock();

    const colorScheme = useColorScheme();


    function isInTheOrder() {
        return orderProducts.some(item => item.id_product == product.id)
    }


    //definindo cores
    var bgItemColor = Colors[colorScheme].itemColor;
    var bgItemPriceColor = priceModel == 'main' ? Colors.primary : Colors.gray;
    var priceColor = Colors[colorScheme].textContrast;
    var nameColor = Colors[colorScheme].text;

    //se o produto está no pedido outras cores são exibidas
    const productIsInTheOrder = isInTheOrder();
    if (productIsInTheOrder) {
        bgItemColor = priceModel == 'main' ? Colors.lightPrimary : Colors.lightGray;
        bgItemPriceColor = Colors.white;
        priceColor = priceModel == 'main' ? Colors.primary : Colors.gray;
    }
    //valores

    //se o modelo de preço selecionado for o principal, é exibido o main_price, caso contrário, é exibido o preço secundário
    var price_product = (priceModel == 'main' ? product.main_price : (product.secondary_price || 0));
    const priceProductFormatted = price_product.toFixed(2).replace('.', ',')
    var image_url = `${api.defaults.baseURL}${product.image_path}`;
    var objectStockFromContext = stock.find(item => item.id_product === product.id);
    var stockValue = objectStockFromContext?.quantity;

    console.log(product.name_product)
    return (
        <Pressable
            style={({ pressed }) => [
                {
                    backgroundColor: pressed ? Colors[colorScheme].background : bgItemColor,
                    // display: hideProduct ? 'none' : 'flex'
                }, styles.item]}
            key={product.id}
            onLongPress={() => {
                setModal({ options: { product: product, type: 'add' }, showModal: true })
            }}
            delayLongPress={250}
            onPress={() => addProductToOrder(product)}>

            <View style={styles.itemHeader}>
                <Text style={[styles.itemName, { color: nameColor }]}>{product.name_product}</Text>
                {
                    product_count > 0 &&
                    <Text style={styles.itemCount}>{product_count}</Text>
                }

            </View>
            <View style={styles.itemBody}>
                <View style={styles.itemImage}>
                    {
                        product.image_path &&
                        <Image resizeMode='contain' style={{ width: '100%', height: '100%' }} source={{ uri: image_url }} />
                    }
                </View>
                <View>

                    <View style={{ margin: 4 }}>
                        <Text style={{ fontSize: 8, color: Colors.gray }}>estoque</Text>
                        <Text style={{ color: Colors.gray, textAlign: 'right' }}>{JSON.stringify(stockValue)}</Text>
                    </View>
                    {
                        price_product > 0 &&
                        <Text style={[styles.itemPrice, { backgroundColor: bgItemPriceColor, color: priceColor }]}>
                            R$ {priceProductFormatted}
                        </Text>
                    }
                </View>


            </View>
        </Pressable >
    )
}
// React.memo(ProductItem);

