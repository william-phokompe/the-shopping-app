import React from "react";
import { ProductsNavigator } from "./ShopNavigator";
import { NavigationContainer } from "@react-navigation/native";

// Use this component to find out when the token is set to null
// to trigger an auto logout
const AppNavigator = (props) => {
  // Allows you to directly render an element you use in your JSX
  // const navRef = useRef();
  // Force is auth to be true or false based on whether the token is null or not
  // const isAuth = useSelector((state) => !!state.auth.token);

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
      <ProductsNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
