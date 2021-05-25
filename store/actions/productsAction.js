import Product from "../../models/Product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  return async (dispatch) => {
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
          "u1",
          data[key].title,
          data[key].imageUrl,
          data[key].description,
          data[key].price
        )
      );
    }
    dispatch({ type: SET_PRODUCTS, products: loadedProducts });
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://rn-complete-guide-a8532-default-rtdb.firebaseio.com/products/${productId}.json`,
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
  return async (dispatch) => {
    // Execute any async code !
    const response = await fetch(
      "https://rn-complete-guide-a8532-default-rtdb.firebaseio.com/products.json",
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
      },
    });
  };
};

export const UpdateProduct = (productId, title, description, imageUrl) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://rn-complete-guide-a8532-default-rtdb.firebaseio.com/products/${productId}.json`,
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
