import React, { useState } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { enableScreens } from "react-native-screens";
import ReducThunk from "redux-thunk";
import * as Notifications from "expo-notifications";

import productReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import ordersReducer from "./store/reducers/orders";
import authReducer from "./store/reducers/auth";
import { LogBox } from "react-native";
import AppNavigator from "./navigation/AppNavigator";

enableScreens();

// Ignore log notification by message
LogBox.ignoreLogs(["Warning: ..."]);

Notifications.setNotificationHandler({
  handleNotification: async (_) => {
    return { shouldShowAlert: true };
  },
});

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer,
});

const store = createStore(
  rootReducer /*, composeWithDevTools() */,
  applyMiddleware(ReducThunk)
);

const fetchFonts = (_) => {
  return Font.loadAsync({
    "nanum-myeongjo-bold": require("./assets/fonts/NanumMyeongjo-Bold.ttf"),
    "nanum-myeongjo-extrabold": require("./assets/fonts/NanumMyeongjo-ExtraBold.ttf"),
    "nanum-myeongjo-regular": require("./assets/fonts/NanumMyeongjo-Regular.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={(_) => setFontLoaded(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
