export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const deleteProduct = (productId) => {
  return { type: DELETE_PRODUCT, pid: productId };
};

export const CreateProduct = (title, description, imageUrl, price) => {
  return {
    type: CREATE_PRODUCT,
    productData: {
      title,
      description,
      imageUrl,
      price,
    },
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
