import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { ShopNavigator, AuthNavigator } from "./ShopNavigator";
import StartupScreen from "../components/screens/StartupScreen";

// Use this component to find out when the token is set to null
// to trigger an auto logout
const AppNavigator = (props) => {
  // Allows you to directly render an element you use in your JSX
  // const navRef = useRef();
  // Force is auth to be true or false based on whether the token is null or not
  const isAuth = useSelector((state) => !!state.auth.token);
  const autoLogin = useSelector((state) => !!state.auth.didAutoLogin);

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
      {isAuth && <ShopNavigator />}
      {!isAuth && autoLogin && <AuthNavigator />}
      {!isAuth && !autoLogin && <StartupScreen /> }
    </NavigationContainer>
  );
};

export default AppNavigator;
