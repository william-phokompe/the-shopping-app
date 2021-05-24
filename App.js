import React, { useState } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { enableScreens } from "react-native-screens";
import ReducThunk from 'redux-thunk'''

import productReducer from "./store/reducers/products";
import ShopNavigator from "./navigation/ShopNavigator";
import cartReducer from "./store/reducers/cart";
import ordersReducer from "./store/reducers/orders";

import {LogBox} from 'react-native'

enableScreens();

// Ignore log notification by message
LogBox.ignoreLogs(['Warning: ...'])

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: ordersReducer,
});

const store = createStore(rootReducer /*, composeWithDevTools() */, applyMiddleware(ReducThunk));

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
      <ShopNavigator />
    </Provider>
  );
}
