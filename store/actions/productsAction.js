import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";

import Product from "../../models/Product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await fetch(
      "https://rn-complete-guide-a8532-default-rtdb.firebaseio.com/products.json"
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const data = await response.json();
    const loadedProducts = [];

    for (const key in data) {
      loadedProducts.push(
        new Product(
          key,
          data[key].ownerId,
          data[key].ownerPushToken,
          data[key].title,
          data[key].imageUrl,
          data[key].description,
          data[key].price
        )
      );
    }
    dispatch({
      type: SET_PRODUCTS,
      products: loadedProducts,
      userProducts: loadedProducts.filter((prod) => prod.ownerId === userId),
    });
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://rn-complete-guide-a8532-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    dispatch({ type: DELETE_PRODUCT, pid: productId });
  };
};

export const CreateProduct = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    // Execute any async code !

    let pushToken;
    let statusObj = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (statusObj.status !== "granted") {
      statusObj = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
    if (statusObj.status !== "granted") {
      pushToken = null;
    } else {
      pushToken = (await Notifications.getExpoPushTokenAsync()).data;
    }

    const response = await fetch(
      `https://rn-complete-guide-a8532-default-rtdb.firebaseio.com/products.json?auth=${token}`,
      {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
          ownerId: userId,
          ownerPushToken: pushToken,
        }),
      }
    );

    const data = response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: data.id,
        title,
        description,
        imageUrl,
        price,
        ownerId: userId,
        pushToken: pushToken,
      },
    });
  };
};

export const UpdateProduct = (productId, title, description, imageUrl) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://rn-complete-guide-a8532-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    dispatch({
      type: UPDATE_PRODUCT,
      productId: productId,
      productData: {
        title,
        description,
        imageUrl,
      },
    });
  };
};
