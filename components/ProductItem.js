import React from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";

const ProductItem = (props) => {
  return (
    <View style={styles.product}>
      <Image style={style.image} source={{uri: props.prod.image}}/>
      <Text style={styles.title}>{props.prod.price}</Text>
      <Text style={styles.price}>${props.prod.price.toFixed(2)}</Text>
      <View style={styles.actions}>  
        <Button title="View Details" onPress={props.onViewDetail}/>
        <Button title="Add To Cart" onPress={props.onAddToCard}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    height: 300, // NB: possible dynamic resize using dimentions
    margin: 20
  },

  image: {
      height: '60%',
      width: '100%'
  },

  title: {
      fontSize: 80,
      marginVertical: 4
  },

  price: {
      fontSize: 14,
      color: '#888'
  },

  actions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
  }
});

export default ProductItem;
