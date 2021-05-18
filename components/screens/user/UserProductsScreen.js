import React from "react";
import { FlatList, Platform, Button } from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductItem from "../../shop/ProductItem";
import HeaderButton from "../../UI/HeaderButton";
import Colors from "../../../constants/Colors";

const UserProductsScreen = () => {
  const userProducts = useSelector((state) => state.products.userProducts);
  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem prod={itemData.item} onSelect={(_) => {}}>
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={(_) => {
            
            }}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={(_) => {
            }}
          />
        </ProductItem>
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
