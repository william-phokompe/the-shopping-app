import { AUTHENTICATE, SET_AUTO_LOGIN, SIGNOUT } from "../actions/authActions";

const initialState = {
  token: null,
  userId: null,
  didAutoLogin: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        didAutoLogin: true
      };
    case SIGNOUT:
      return {
        ...initialState,
        didAutoLogin: true
      };
    case SET_AUTO_LOGIN:
      return {
        ...state,
        didAutoLogin: true
      }

    // case SIGNUP:
    //   return {
    //     token: action.token,
    //     userId: action.userId,
    //   };
    default:
      return state;
  }
};
