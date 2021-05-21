import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text, ScrollView, TextInput, Platform } from "react-native";
import { useSelector } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../UI/HeaderButton";

const EditProductScreen = (props) => {
  const productId = props.navigation.getParam("productId");

  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((product) => product.id === productId)
  );

  const [Title, setTitle] = useState(editedProduct ? editedProduct.title : "");
  const [ImageUrl, setImageUrl] = useState(
    editedProduct ? editedProduct.imageUrl : ""
  );
  const [Price, setPrice] = useState("");
  const [Description, setDescription] = useState(
    editedProduct ? editedProduct.description : ""
  );

  // CallBack ensures that this function isn't recreated everytim ethe component re-renders, 
  // therefore avoids entering an infinite loop
  const submitHandler = useCallback(() => {
      console.log("Submitting")
  }, []);


  useEffect(() => {
      props.navigation.setParams({submit: submitHandler})
  }, [submitHandler])

  return (
    <ScrollView>
      <View style={styles.form}>
        <View styles={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={Title}
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <View styles={styles.formControl}>
          <Text style={styles.label}>ImageUrl</Text>
          <TextInput
            style={styles.input}
            value={ImageUrl}
            onChangeText={(url) => setImageUrl(url)}
          />
        </View>
        {editedProduct ? null : (
          <View styles={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={Price}
              onChangeText={(price) => setPrice(price)}
            />
          </View>
        )}
        <View styles={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={Description}
            onChangeText={(desc) => setDescription(desc)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },

  input: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },

  label: {
    fontFamily: "nanum-myeongjo-bold",
    marginVertical: 8,
  },
});

EditProductScreen.navigationOptions = (navigationData) => {
    const submitFunc = navigationData.navigation.getParam("submit")
  return {
    headerTitle: navigationData.navigation.getParam("productId")
      ? "Edit Product"
      : "Add Product",
    headerRight: (_) => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          onPress={submitFunc}
        />
      </HeaderButtons>
    ),
  };
};

export default EditProductScreen;
