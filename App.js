import React, { useState } from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { enableScreens } from "react-native-screens";
/*import { composeWithDevTools } from 'redux-devtools-extension'; */

import productReducer from "./store/reducers/products";
import ShopNavigator from "./navigation/ShopNavigator";
import cartReducer from "./store/reducers/cart"

enableScreens();

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer
});

const store = createStore(rootReducer/*, composeWithDevTools() */);

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
