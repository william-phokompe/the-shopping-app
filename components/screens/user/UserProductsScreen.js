import React from "react";
import { FlatList, Platform } from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductItem from "../../shop/ProductItem";
import HeaderButton from "../../UI/HeaderButton";

const UserProductsScreen = () => {
  const userProducts = useSelector((state) => state.products.userProducts);
  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          prod={itemData.item}
          onViewDetail={(_) => {}}
          onAddToCart={(_) => {}}
        />
      )}
    />
  );
};

UserProductsScreen.navigationOptions = {
  headerTitle: "User Products",
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

export default UserProductsScreen;
