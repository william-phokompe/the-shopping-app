import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cartActions";
import CartItem from "../../models/Cart-Item";
import { ADD_ORDER } from "../actions/ordersActions";
import { DELETE_PRODUCT } from "../actions/productsAction";

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
      const productImage = action.product.imageUrl;

      let cartItem;

      if (state.items[addedProduct.id]) {
        // Already have the item in the cart
        cartItem = new CartItem(
          productImage,
          state.items[addedProduct.id].quantity + 1,
          productPrice,
          productTitle,
          state.items[addedProduct.id].sum + productPrice
        );
      } else {
        // Create a new cart item
        cartItem = new CartItem(
          productImage,
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

    case REMOVE_FROM_CART:
      const selectCartItem = state.items[action.id];
      const currentQuantity = state.items[action.id].quantity;
      let updatedCartItems;
      if (currentQuantity > 1) {
        // Reduce the quantity
        updatedCartItem = new CartItem(
          selectCartItem.imageUrl,
          selectCartItem.quantity - 1,
          selectCartItem.productPrice,
          selectCartItem.productTitle,
          selectCartItem.sum - selectCartItem.productPrice
        );

        updatedCartItems = { ...state.items, [action.id]: updatedCartItem };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.id];
      }

      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectCartItem.productPrice,
      };
    case ADD_ORDER:
      return initialState;
    case DELETE_PRODUCT:
      if (state.items[action.pid]) {
        return state;
      }
      const updatedItems = { ...state.items };
      const itemTotal = state.items[action.pid].sum;
      delete updatedCartItems[action.pid];
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal,
      };
    default:
      break;
  }
  return state;
};
