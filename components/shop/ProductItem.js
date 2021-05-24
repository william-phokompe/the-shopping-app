import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import Card from "../UI/Card";

const ProductItem = (props) => {
  let TouchableComponent = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21)
    TouchableComponent = TouchableNativeFeedback;
  return (
    <Card childStyle={styles.product}>
      <View style={styles.touchable}>
        <TouchableComponent onPress={props.onSelect} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{ uri: props.prod.imageUrl }}
              />
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>{props.prod.title}</Text>
              <Text style={styles.price}>${props.prod.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
              {props.children}
            </View>
          </View>
        </TouchableComponent>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 300, // NB: possible dynamic resize using dimentions
    margin: 20,
    overflow: "hidden",
  },

  imageContainer: {
    height: "60%",
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },

  image: {
    height: "100%",
    width: "100%",
  },

  title: {
    fontSize: 18,
    marginVertical: 4,
    fontFamily: "nanum-myeongjo-bold",
  },

  price: {
    fontFamily: "nanum-myeongjo-bold",
    fontSize: 14,
    color: "#888",
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "23%",
    paddingHorizontal: 20,
  },

  details: {
    fontFamily: "nanum-myeongjo-regular",
    alignItems: "center",
    height: "15%",
    padding: 10,
  },

  touchable: {
    borderRadius: 10,
    overflow: "hidden",
  },
});

export default ProductItem;
