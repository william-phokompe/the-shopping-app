import Order from "../../models/Order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://rn-complete-guide-a8532-default-rtdb.firebaseio.com/orders/${userId}.json`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      const loadedOrders = [];

      for (const key in data) {
        loadedOrders.push(
          new Order(
            key,
            data[key].cartItems,
            data[key].totalAmount,
            data[key].date
          )
        );
      }

      dispatch({ type: SET_ORDERS, orders: loadedOrders });
    } catch (error) {
      throw error;
    }
  };
};

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();
    const response = await fetch(
      `https://rn-complete-guide-a8532-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString(),
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const data = response.json();

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: data.name,
        items: cartItems,
        amount: totalAmount,
        date: date,
      },
    });

    for (const cartItem of cartItems) {
      const pushToken = cartItem.pushToken;

      fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Accept-Encoding': 'gzip, defate',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: pushToken,
          title: 'Orderd Item',
          body: cartItem.productPushToken
        })
      })
    }
  };
};
