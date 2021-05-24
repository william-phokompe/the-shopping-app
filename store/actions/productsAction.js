import Product from "../../models/Product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  return async (dispatch) => {
    fetch(
      "https://rn-complete-guide-a8532-default-rtdb.firebaseio.com/products.json"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong!")
        }

        return response.json();
      })
      .then((data) => {
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
      }).catch(err => {
        // send to analytics server
        throw err;
      });
  };
};

export const deleteProduct = (productId) => {
  return { type: DELETE_PRODUCT, pid: productId };
};

export const CreateProduct = (title, description, imageUrl, price) => {
  return async (dispatch) => {
    // Execute any async code !
    fetch(
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
    )
      .then((response) => response.json())
      .then((data) => {
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
      });
  };
};

export const UpdateProduct = (productId, title, description, imageUrl) => {
  return {
    type: UPDATE_PRODUCT,
    productId: productId,
    productData: {
      title,
      description,
      imageUrl,
    },
  };
};
