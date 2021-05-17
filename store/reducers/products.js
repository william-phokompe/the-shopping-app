import PRODUCTS from "../../data/mock-data";

const initialState = {
  availableProducts: PRODUCTS, // all products in the inventory
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1"), // User specific products
};

export default (state = initialState, action) => {
  return state;
};
