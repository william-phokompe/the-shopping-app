import React from "react";
import {
  Platform,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Card from '../UI/Card'

const CartItem = (props) => {
  let TouchableComponent = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21)
    TouchableComponent = TouchableNativeFeedback;
  return (
    <Card childstyle={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{props.quantity} </Text>
        <Text style={styles.mainText}>{props.title}</Text>
      </View>

      <View style={styles.itemData}>
        <Text style={styles.mainText}>
          ${props.amount.toFixed(2)}
        </Text>
        {props.deletable && <TouchableComponent
          onPress={props.onRemove}
          style={styles.deleteButton}
        >
          <Ionicons
            name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
            size={20}
            color="red"
          />
        </TouchableComponent>}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginBottom: 7
  },

  itemData: {
    flexDirection: "row",
    alignItems: "center",
  },
  
  quantity: {
    fontFamily: "nanum-myeongjo-regular",
    color: "#888",
    fontSize: 16,
  },
  mainText: {
    fontFamily: "nanum-myeongjo-bold",
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 20,
  },
});

export default CartItem;
