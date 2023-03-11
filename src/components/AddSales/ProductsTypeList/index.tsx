import { styles } from './styles';

import React, { memo, useEffect, useMemo, useState } from 'react';
import { View, Image, Text, FlatList, Pressable, TouchableOpacity, ScrollView } from 'react-native';

import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
//TYPES
import { ProductProps } from '../../../@types/product';
//CONTEXTS
import { useOrderProducts } from '../../../contexts/order';
import { useStock } from '../../../contexts/stock';

import api from '../../../services/api';
import { OrderProductProps } from '../../../@types/orderProduct';
import { StockProps } from '../../../@types/stock';
import { PriceModels } from '../../../@types/sales';

interface Props {
    productsArr: ProductProps[]
    // setModal: React.Dispatch<React.SetStateAction<{
    //     showModal: boolean;
    //     options: {
    //         product: ProductProps;
    //         type: 'add' | 'sub';
    //         initialCount?: number;
    //     };
    // }>>,
    orderProducts: OrderProductProps[]
}
export const ProductTypeListMemo = memo(ProductsTypeList)

export function ProductsTypeList({ productsArr, orderProducts }: Props) {
    const colorScheme = useColorScheme();

    return (
        <View>
            <Text style={{ fontWeight: '700', fontSize: 24, color: Colors[colorScheme].text }}>{productsArr[0].type_product}</Text>
            <ScrollView
                horizontal
                style={styles.grid}
            >
                <Itens orderProducts={orderProducts} productsArr={productsArr} />
            </ScrollView>
        </View>
    );
}

function Itens({ productsArr, orderProducts }: Props) {
    const { stockMap } = useStock();
    const { addProductToOrder, priceModel } = useOrderProducts();

    return (
        <>
            {
                productsArr.map(product => {
                    const orderItem = orderProducts.find(item => item.id_product == product.id_product)
                    const productCount = (orderItem?.count) || 0;
                    const stockValue = stockMap.get(product.id_product) || 0;
                    return <ItemMemo key={product.id_product} stockValue={stockValue} addProductToOrder={addProductToOrder} priceModel={priceModel} productCount={productCount} product={product} />
                })
            }
        </>
    )
}


interface ItemProps {
    product: ProductProps
    // setModal: React.Dispatch<React.SetStateAction<{
    //     showModal: boolean;
    //     options: {
    //         product: ProductProps;
    //         type: 'add' | 'sub';
    //         initialCount?: number;
    //     };
    // }>>
    stockValue: number
    addProductToOrder: (product: ProductProps) => void
    priceModel: PriceModels
    productCount: number
}


const ItemMemo = memo(ItemComponent, (prevProps, nextProps) => (prevProps.productCount === nextProps.productCount) && (prevProps.priceModel === nextProps.priceModel));

function ItemComponent({ product, stockValue, productCount, priceModel, addProductToOrder }: ItemProps) {
    const colorScheme = useColorScheme();

    const initialColors = {
        background: Colors[colorScheme].itemColor,
        backgroundPrice: priceModel == 'main_price' ? Colors.primary : Colors.gray,
        price: Colors[colorScheme].textContrast,
        name: Colors[colorScheme].text
    }
    const orderedColors = {
        background: priceModel == 'main_price' ? Colors.primary : Colors.gray,
        backgroundPrice: Colors.white,
        price: priceModel == 'main_price' ? Colors.primary : Colors.gray,
        name: Colors[colorScheme].text
    }
    //se o produto está no pedido outras cores são exibidas
    const itemColors = useMemo(() => {
        return productCount > 0 ? orderedColors : initialColors
    }, [productCount, priceModel]);


    //se o modelo de preço selecionado for o principal, é exibido o main_price, caso contrário, é exibido o preço secundário
    const price_product = (product[priceModel] || 0);
    const priceProductFormatted = price_product.toFixed(2).replace('.', ',')
    const image_url = `${api.defaults.baseURL}${product.image_path}`;

    return (
        <Pressable
            style={({ pressed }) => [
                {
                    backgroundColor: pressed ? Colors[colorScheme].background : itemColors.background,
                    // display: hideProduct ? 'none' : 'flex'
                }, styles.item]}
            key={product.id_product}
            // onLongPress={() => {
            //     setModal({ options: { product: product, type: 'add' }, showModal: true })
            // }}
            delayLongPress={250}
            onPress={() => {
                addProductToOrder(product)
            }}>

            <View style={styles.itemHeader}>
                <Text style={[styles.itemName, { color: itemColors.name }]}>{product.name_product}</Text>
                {
                    productCount > 0 &&
                    <Text style={styles.itemCount}>{productCount}</Text>
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
                        <Text style={[styles.itemPrice, { backgroundColor: itemColors.backgroundPrice, color: itemColors.price }]}>
                            R$ {priceProductFormatted}
                        </Text>
                    }
                </View>


            </View>
        </Pressable >
    )
}
// React.memo(ProductItem);

