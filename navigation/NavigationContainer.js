import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { NavigationActions } from "react-navigation";
import ShopNavigator from "./ShopNavigator";

// Use this component to find out when the token is set to null
// to trigger an auto logout
const NavigationContainer = (props) => {
  // Allows you to directly render an element you use in your JSX
  const navRef = useRef();
  // Force is auth to be true or false based on whether the token is null or not
  const isAuth = useSelector((state) => !!state.auth.token);

  useEffect(() => {
    if (!isAuth) {
      navRef.current.dispatch(
        NavigationActions.navigate({ routeName: "Auth" })
      );
    }
  }, [isAuth]);

  return <ShopNavigator ref={navRef} />; // Assignment establishes a connection
};

export default NavigationContainer;
