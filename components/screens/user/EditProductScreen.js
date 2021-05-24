import React, { useEffect, useCallback, useReducer } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../UI/HeaderButton";
import * as productsActions from "../../../store/actions/productsAction";
import Input from "../../UI/Input";
import Colors from "../../../constants/Colors";

const formReducer = (state, action) => {
  if (action.type === "FORM_UPDATE") {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };

    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };

    let updatedFormValidity = true;

    for (const key in updatedValidities) {
      updatedFormValidity = updatedFormValidity && updatedValidities[key];
    }

    return {
      formIsValid: updatedFormValidity,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
    };
  }

  return state;
};

const EditProductScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const productId = props.navigation.getParam("productId");
  const dispatch = useDispatch();

  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((product) => product.id === productId)
  );

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
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

  useEffect(() => {
  if (error) {
    Alert.alert('An error occurred', error, [{text: 'Okay'}])
  }
    return () => {
      cleanup
    };
  }, [error]);

  // CallBack ensures that this function isn't recreated everytim ethe component re-renders,
  // therefore avoids entering an infinite loop
  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert("Invalid input", "Please fill in missing inputs", [
        { text: "Okay" },
      ]);
      return;
    }

    setError(null);
    try {
      setIsLoading(true);
      if (editedProduct) {
        await dispatch(
          productsActions.UpdateProduct(
            productId,
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl
          )
        );
      } else {
        await dispatch(
          productsActions.CreateProduct(
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
            +formState.inputValues.price
          )
        );
      }
      props.navigation.goBack();
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  }, [dispatch, productId, formState]); // formState will change with every keystroke

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const inputChangeHandler = useCallback(
    (identifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: "FORM_UPDATE",
        value: inputValue,
        isValid: inputValidity,
        input: identifier,
      });
    },
    [dispatchFormState]
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            keyboardType="default"
            returnKeyType="next"
            autoCorrect
            label="Title"
            errorMessage="Please enter a valid text!"
            onInputChange={inputChangeHandler}
            initialvalue={editedProduct ? editedProduct.title : ""}
            initiallyValid={!!editedProduct}
            required
          />
          <Input
            id="imageUrl"
            label="Image Url"
            errorMessage="Please add a valid image Url"
            keyboardType="default"
            onInputChange={inputChangeHandler}
            initialvalue={editedProduct ? editedProduct.imageUrl : ""}
            initiallyValid={!!editedProduct}
            required
          />

          {editedProduct ? null : (
            <Input
              id="price"
              label="Price"
              keyboardType="decimal-pad"
              errorMessage="Price of product required!"
              onInputChange={inputChangeHandler}
              required
              min={0.1}
            />
          )}
          <Input
            id="description"
            label="Description"
            keyboardType="default"
            multiline
            numberofLines={3}
            errorMessage="Valid description required"
            initialvalue={editedProduct ? editedProduct.description : ""}
            initiallyValid={!!editedProduct}
            onInputChange={inputChangeHandler}
            required
            minLength={3}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
