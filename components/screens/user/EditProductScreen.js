import React, { useEffect, useCallback, useReducer } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  Platform,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../UI/HeaderButton";
import * as productsActions from "../../../store/actions/productsAction";

const formReducer = (state, action) => {
  if (action.type === "FORM_UPDATE") {
  }
};

const EditProductScreen = (props) => {
  const productId = props.navigation.getParam("productId");
  const dispatch = useDispatch();

  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((product) => product.id === productId)
  );

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValue: {
      title: editedProduct ? editedProduct.title : "",
      imageUrl: editedProduct ? editedProduct.imageUrl : "",
      description: editedProduct ? editedProduct.description : "",
      price: "",
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  // CallBack ensures that this function isn't recreated everytim ethe component re-renders,
  // therefore avoids entering an infinite loop
  const submitHandler = useCallback(() => {
    if (!isTitleValid) {
      Alert.alert("invalid input", "Please fill in missing inputs", [
        { text: "Okay" },
      ]);
      return;
    }
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

  const titleChangeHandler = (text) => {
    let isValid = false;

    if (text.trim().length > 0) {
      isValid = true;
    }

    dispatchFormState({
      type: "FORM_UPDATE",
      value: text,
      isValid: isValid,
      inputId: "title",
    });
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <View styles={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={titleChangeHandler}
            keyboardType="default"
            returnKeyType="next"
            autoCorrect
          />
          {!isTitleValid && <Text>Please enter a valid text!</Text>}
        </View>
        <View styles={styles.formControl}>
          <Text style={styles.label}>ImageUrl</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
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
              onChangeText={(text) => setPrice(text)}
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
            onChangeText={(text) => setDescription(text)}
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
