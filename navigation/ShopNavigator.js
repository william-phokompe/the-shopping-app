import React from "react";
import {
  createAppContainer,
  createDrawerNavigator,
  createSwitchNavigator,
} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ProductsOverviewScreen from "../components/screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../components/screens/shop/ProductDetailScreen";
import Colors from "../constants/Colors";
import CartScreen from "../components/screens/shop/CartScreen";
import OrdersScreen from "../components/screens/shop/OrdersScreen";
import UserProductsScreen from "../components/screens/user/UserProductsScreen";
import EditProductScreen from "../components/screens/user/EditProductScreen";
import AuthScreen from "../components/screens/user/AuthScreen";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "nanum-myeongjo-extrabold",
  },
  headerBackTitleStyle: {
    fontFamily: "nanum-myeongjo-bold",
  },
  headerTint: Platform.OS === "android" ? "white" : Colors.primary,
};

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const OrdersNavigator = createStackNavigator(
  {
    orders: OrdersScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-list" : "ios-list"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const AdminNavigator = createStackNavigator(
  {
    UseProducts: UserProductsScreen,
    EditProduct: EditProductScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-create" : "ios-create"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
      itemsContainerStyle: {
        marginVertical: 100,
      },
    },
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  { defaultNavigationOptions: defaultNavOptions }
);

const MainNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
  Shop: ShopNavigator,
});

export default createAppContainer(MainNavigator);
