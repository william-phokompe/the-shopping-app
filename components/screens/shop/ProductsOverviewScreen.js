import React, { useEffect, useState, useCallback } from "react";
import {
  FlatList,
  Platform,
  Button,
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
  RefreshControl,
  StatusBar
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductItem from "../../shop/ProductItem";
import * as cartActions from "../../../store/actions/cartActions";
import * as productActions from "../../../store/actions/productsAction";
import HeaderButton from "../../UI/HeaderButton";
import Colors from "../../../constants/Colors";

const ProductsOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(undefined);
  const dispatch = useDispatch();

  const loadProducts = useCallback(
    async (_) => {
      setError(undefined);
      setIsRefreshing(true);
      try {
        await dispatch(productActions.fetchProducts());
      } catch (error) {
        setError(error.message);
      }
      setIsRefreshing(false);
    },
    [dispatch, setIsLoading, setError]
  );

  useEffect(
    (_) => {
      const unsubscribe = props.navigation.addListener("focus", loadProducts);

      return () => {
        unsubscribe();
      };
    },
    [loadProducts]
  );

  useEffect(
    (_) => {
      setIsLoading(true);
      loadProducts().then((_) => {
        setIsLoading(false);
      });
    },
    [dispatch, loadProducts]
  );

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title,
    });
  };

  if (error) {
    return (
      <View style={styles.loader}>
        <Text>An error occurred!</Text>
        <Button
          title="Try Again"
          onPress={loadProducts}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.loader}>
        <Text>There are not products found. Try adding some...</Text>
      </View>
    );
  }

  return (
    <>
    <FlatList
      refreshControl={
        <RefreshControl onRefresh={loadProducts} refreshing={isRefreshing} />
      }
      keyExtractor={(item) => item.id}
      data={products}
      renderItem={(itemData) => (
        <ProductItem
          prod={itemData.item}
          onSelect={(_) => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={(_) => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Colors.primary}
            title="Add To Cart"
            onPress={(_) => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          />
        </ProductItem>
      )}
    />
    <StatusBar style='auto' />
    </>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export const screenOptions = (navigationData) => {
  return {
    headerTitle: "Shop",
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
    headerRight: (_) => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            navigationData.navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default ProductsOverviewScreen;
