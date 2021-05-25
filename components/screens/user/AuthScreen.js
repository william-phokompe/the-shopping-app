import React, { useEffect, useCallback, useReducer } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Button,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Input from "../../UI/Input";
import Card from "../../UI/Card";
import Colors from "../../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import * as authActions from "../../../store/actions/authActions";

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

const AuthScreen = () => {
  const [isSignup, setSignup] = useState(false);
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const authDispatcher = (_) => {
    let action;
    if (isSignup) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = authActions.signin(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }

    dispatch(action);
  };

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

  return (
    <KeyboardAvoidingView style={styles.screen}>
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card childStyle={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorMessage="Please enter a valid email address."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorMessage="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <View style={styles.buttonContainer}>
              <Button
                title={isSignup ? "Sign Up" : "Sign In"}
                color={Colors.primary}
                onPress={authDispatcher}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignup ? "Sign In" : "Sign Up"}`}
                color={Colors.secondary}
                onPress={(_) => {
                  setSignup((prevState) => !prevState);
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: "Authenticate",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default AuthScreen;
