import React from "react";
import { useSelector } from "react-redux";
// import ShopNavigator from "./ShopNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ProductsOverviewScreen from "../components/screens/shop/ProductsOverviewScreen";

const MyStack = createStackNavigator(); //Object with a navigator prop which value is a component

// Use this component to find out when the token is set to null
// to trigger an auto logout
const AppNavigator = (props) => {
  // Allows you to directly render an element you use in your JSX
  // const navRef = useRef();
  // Force is auth to be true or false based on whether the token is null or not
  const isAuth = useSelector((state) => !!state.auth.token);

  // useEffect(() => {
  //   if (!isAuth) {
  //     navRef.current.dispatch(
  //       NavigationActions.navigate({ routeName: "Auth" })
  //     );
  //   }
  // }, [isAuth]);

  // return <ShopNavigator />; // Assignment establishes a connection
  return (
    <NavigationContainer>
      <MyStack.Navigator>
        <MyStack.Screen
          name="ProductsOverview"
          component={ProductsOverviewScreen}
        />
       {/* Allows to define a screen that you want to be part of the navigation stack */}
      </MyStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
