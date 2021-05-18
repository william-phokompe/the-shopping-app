import { ADD_TO_CART } from "../actions/cartActions";
import CartItem from "../../models/Cart-Item";

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const productPrice = action.product.price;
      const productTitle = action.product.title;

      let cartItem;

      if (state.items[addedProduct.id]) {
        // Already have the item in the cart
        cartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          productPrice,
          productTitle,
          state.items[addedProduct.id].sum + productPrice
        );
      } else {
        // Create a new cart item
        cartItem = new CartItem(
          1,
          productPrice,
          productTitle,
          productPrice
        );
      }

      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: cartItem },
        totalAmount: state.totalAmount + productPrice,
      };

    default:
      break;
  }
  return state;
};
