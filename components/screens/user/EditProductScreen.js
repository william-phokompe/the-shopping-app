import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  Platform
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../UI/HeaderButton";
import * as productsActions from "../../../store/actions/productsAction";

const EditProductScreen = (props) => {
  const productId = props.navigation.getParam("productId");
  const dispatch = useDispatch();

  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((product) => product.id === productId)
  );

  const [title, setTitle] = useState(editedProduct ? editedProduct.title : "");
  const [imageUrl, setImageUrl] = useState(
    editedProduct ? editedProduct.imageUrl : ""
  );
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(
    editedProduct ? editedProduct.description : ""
  );

  // CallBack ensures that this function isn't recreated everytim ethe component re-renders,
  // therefore avoids entering an infinite loop
  const submitHandler = useCallback(() => {
    if (editedProduct) {
      dispatch(
        productsActions.UpdateProduct(productId, title, description, imageUrl)
      );
    } else {
      
      dispatch(
        productsActions.CreateProduct(title, description, imageUrl, +price)
      );
    }
    props.navigation.goBack();
  }, [dispatch, productId, title, description, imageUrl, price]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View styles={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(text) => setTitle(text)}
            keyboardType="default"
            returnKeyType="next"
            autoCorrect
          />
        </View>
        <View styles={styles.formControl}>
          <Text style={styles.label}>ImageUrl</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={text => setImageUrl(text)}
            keyboardType="default"
            returnKeyType="next"
          />
        </View>
        {editedProduct ? null : (
          <View styles={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={text => setPrice(text)}
              keyboardType="decimal-pad"
              returnKeyType="next"
            />
          </View>
        )}
        <View styles={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={text => setDescription(text)}
            keyboardType="default"
            multiline={true}
            onSubmitEditing={submitHandler}
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
  const submitFunc = navigationData.navigation.getParam("submit");
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
