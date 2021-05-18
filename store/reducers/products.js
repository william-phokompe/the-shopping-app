import PRODUCTS from "../../data/mock-data";
import { DELETE_PRODUCT } from "../actions/productsAction";

const initialState = {
  availableProducts: PRODUCTS, // all products in the inventory
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1"), // User specific products
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.pid
        ),
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== action.pid
        )
      };

    default:
      break;
  }
  return state;
};
