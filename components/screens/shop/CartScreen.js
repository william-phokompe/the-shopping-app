import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  ActivityIndicator,
  StatusBar
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import Colors from "../../../constants/Colors";
import CartItem from "../../shop/CartItem";
import * as cartActions from "../../../store/actions/cartActions";
import * as ordersActions from "../../../store/actions/ordersActions";
import Card from "../../UI/Card";

const CartScreen = (props) => {
  const dispatch = useDispatch();
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null)
  const cartItems = useSelector((state) => {
    const transformedCartItem = [];

    for (const key in state.cart.items) {
      transformedCartItem.push({
        productId: key,
        imageUrl: state.cart.items[key].imageUrl,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
        productPushToken: state.cart.items[key].pushToken
      });
    }
    return transformedCartItem.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  const sendOrderHandler = async () => {
    setIsLoading(true);
    await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
    setIsLoading(false);
  };

  return (
    <View style={styles.screen}>
      <Card childStyle={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>
            ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.primary} />
        ) : (
          <Button
            color={Colors.secondary}
            title="Order"
            disabled={cartItems.length === 0}
            onPress={sendOrderHandler}
          />
        )}
      </Card>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.productPrice}
            deletable
            onRemove={(_) => {
              dispatch(cartActions.removeFromCart(itemData.item.productId));
            }}
          />
        )}
      />
      <StatusBar style="auto" />
    </View>
  );
};

export const screenOptions = {
  headerTitle: "Your Cart",
};

const styles = StyleSheet.create({
  screen: { margin: 20 },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
  },
  summaryText: { fontFamily: "nanum-myeongjo-extrabold", fontSize: 18 },
  amount: { color: Colors.primary },
});

export default CartScreen;
