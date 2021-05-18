import { createAppContainer, createDrawerNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Platform } from "react-native";

import ProductsOverviewScreen from "../components/screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../components/screens/shop/ProductDetailScreen";
import Colors from "../constants/Colors";
import CartScreen from "../components/screens/shop/CartScreen";
import OrdersScreen from "../components/screens/shop/OrdersScreen";

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
  }

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const OrdersNavigator = createStackNavigator(
  {
    orders: OrdersScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.primary
    }
})

export default createAppContainer(ShopNavigator);
