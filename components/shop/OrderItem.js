import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Colors from "../../constants/Colors";
import CartItem from "./CartItem";

import Card from '../UI/Card'

const OrderItem = (props) => {
  const [shwowDetails, setShowDetails] = useState(false);

  console.log(props.items)
  return (
    <Card childStyle={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        color={Colors.primary}
        title={shwowDetails ? "Hide Details" : "Show Details"}
        onPress={(_) => {
          setShowDetails((prevState) => !prevState);
        }}
      />
      {shwowDetails && (
        <View style={styles.detailItem}>
          {props.items.map((cartItem) => (
            <CartItem
              key={cartItem.productId}
              quantity={cartItem.quantity}
              title={cartItem.productTitle}
              amount={cartItem.sum}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  detailItem: {
    width: "100%",
    marginTop: 10
  },
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  totalAmount: {
    fontFamily: "nanum-myeongjo-bold",
    fontSize: 16,
  },
  date: {
    fontFamily: "nanum-myeongjo-regular",
    fontSize: 16,
    color: "#888",
  },
});

export default OrderItem;
