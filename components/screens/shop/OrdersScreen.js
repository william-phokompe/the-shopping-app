import React, { useEffect, useState, useCallback } from "react";
import { FlatList, ActivityIndicator, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../UI/HeaderButton";
import OrderItem from "../../shop/OrderItem";
import * as ordersActions from "../../../store/actions/ordersActions";
import Colors from "../../../constants/Colors";

const OrdersScreen = (props) => {
  const orders = useSelector((state) => state.orders.orders);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const loadOrders = useCallback(
    async (_) => {
      setError(undefined);
      setIsLoading(true);
      try {
        await dispatch(ordersActions.fetchOrders());
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    },
    [dispatch, setIsLoading, setError]
  );

  useEffect(
    (_) => {
      const willFocustSub = props.navigation.addListener(
        "willFocus",
        loadOrders
      );

      return () => {
        willFocustSub.remove();
      };
    },
    [loadOrders]
  );

  if (error) {
    return (
      <View style={styles.loader}>
        <Text>An error occurred!</Text>
        <Button
          title="Try Again"
          onPress={loadOrders}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && orders.length === 0) {
    return (
      <View>
        <Text>There are no orders at this moment/ Please go make some...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

OrdersScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: "Your Orders",
    headerLeft: (_) => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navigationData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default OrdersScreen;
