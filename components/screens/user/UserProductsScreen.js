import React from "react";
import { FlatList, Platform, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductItem from "../../shop/ProductItem";
import HeaderButton from "../../UI/HeaderButton";
import Colors from "../../../constants/Colors";
import * as productsActions from "../../../store/actions/productsAction";

const UserProductsScreen = () => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();
  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem prod={itemData.item} onSelect={(_) => {}}>
          <Button color={Colors.primary} title="Edit" onPress={(_) => {}} />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={(_) => {
              dispatch(productsActions.deleteProduct(itemData.item.id));
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
