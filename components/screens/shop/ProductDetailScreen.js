import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Button,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import Colors from "../../../constants/Colors";
import * as cartActions from '../../../store/actions/cartActions'

const ProductDetailScreen = (props) => {
  const productId = props.route.params.productId;
  const dispatch = useDispatch();
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === productId)
  );

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="Add To Cart"
          onPress={(_) => {
              dispatch(cartActions.addToCart(selectedProduct))
          }}
        />
      </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

export const screenOptions = (navigationData) => {
  return {
    // headerTitle: navigationData.navigation.getParam("productTitle"),
    headerTitle: navigationData.route.params.productTitle,
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },

  actions: {
    marginVertical: 10,
    alignItems: "center",
  },

  price: {
    fontFamily: "nanum-myeongjo-bold",
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
  },

  description: {
    fontFamily: "nanum-myeongjo-regular",
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
  },
});

export default ProductDetailScreen;
