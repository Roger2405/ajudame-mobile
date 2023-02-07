import { Feather, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, TouchableHighlight } from 'react-native';
import { ProductProps } from '../../../@types/product';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';

import { itemStyles, listStyles } from './styles';

interface ProductListProps {
    products: ProductProps[]
}
export function ProductList({ products }: ProductListProps) {
    return (
        <View style={[listStyles.container]}>
            <Text style={[listStyles.title, { color: Colors.gray }]}>{products[0].type_product}</Text>
            <FlatList
                data={products}
                renderItem={(product) => <ProductListItem product={product.item} />}
                bounces
            />
        </View>
    )
}

interface ProductListItemProps {
    product: ProductProps
}
function ProductListItem({ product }: ProductListItemProps) {
    const colorScheme = useColorScheme();
    const { navigate } = useNavigation();

    function handleEditProduct() {
        navigate('ProductForm', { id: product.id })
    }
    return (
        <View style={[itemStyles.item, { backgroundColor: Colors[colorScheme].itemColor }]}>
            <Text style={[itemStyles.name, { color: Colors.gray }]}>{product.name_product}</Text>
            <View style={itemStyles.prices}>
                <Text style={[itemStyles.price, { fontWeight: '700', color: Colors.primary }]}>R$ {product.main_price.toFixed(2)}</Text>
                {
                    product.secondary_price ?
                        <Text style={[itemStyles.price, { opacity: 0.75, color: Colors.primary }]}>R$ {product.secondary_price.toFixed(2)}</Text>
                        :
                        <Text style={[itemStyles.price, { opacity: 0.75, color: Colors.gray }]}>S/N</Text>
                }
            </View>
            <TouchableOpacity
                onPress={handleEditProduct}
                style={[itemStyles.editButton, { backgroundColor: Colors.primary }]}
            >
                <MaterialIcons size={24} name={'edit'} color={Colors[colorScheme].itemColor} />
            </TouchableOpacity>
        </View>
    )
}
