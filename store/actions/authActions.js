import AsyncStorage from "@react-native-async-storage/async-storage";

// export const SIGNUP = "SIGNUP";
// export const SIGNIN = "SIGNIN";
export const AUTHENTICATE = "AUTHENTICATE";
export const SIGNOUT = "SIGNOUT";
export const SET_AUTO_LOGIN = 'SET_AUTO_LOGIN'

let timer;

export const tryAutoLogin = _ => {
  return {
    type: SET_AUTO_LOGIN
  }
}

export const authenticate = (userId, token, expiryTime) => {
  return dispatch => {
    dispatch(setSignoutTimer(expiryTime))
    dispatch({
      type: AUTHENTICATE,
      userId: userId,
      token: token,
    })
  }
};

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDLrKSLkEyFrP4CTshgiI4MpM9_A5ABAio
        `,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      const errorId = errorResponse.error.message;
      let message = "Something went wrong!";

      if (errorId === "EMAIL_EXISTS") {
        message = "This email is already registered";
      }

      throw new Error(message);
    }

    const data = await response.json();

    dispatch(authenticate(data.localId, data.idToken, parseInt(data.expiresIn) * 1000));
    const expirationDate = new Date(
      new Date().getTime() + parseInt(data.expiresIn) * 1000
    ).toISOString();
    saveDataToStorage(data.idToken, data.localId, expirationDate);
  };
};

export const signin = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDLrKSLkEyFrP4CTshgiI4MpM9_A5ABAio
        `,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      console.log(errorResponse);
      const errorId = errorResponse.error.errors[0].message;
      let message = "Something went wrong!";

      if (errorId === "EMAIL_NOT_FOUND") {
        message = "This email could not be found!";
      } else if (errorId === "INVALID_PASSWORD") {
        message = "Password is not valid";
      } else if (errorId === "MISSING_PASSWORD") {
        message = "Please enter password.";
      }

      throw new Error(message);
    }

    const data = await response.json();

    dispatch(authenticate(data.localId, data.idToken, parseInt(data.expiresIn) * 1000));
    const expirationDate = new Date(
      new Date().getTime() + parseInt(data.expiresIn) * 1000
    ).toISOString();
    saveDataToStorage(data.idToken, data.localId, expirationDate);
  };
};

const setSignoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(signout());
    }, expirationTime);
  };
};

const clearSignoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token,
      userId,
      expiryDate: expirationDate,
    })
  );
};

export const signout = () => {
  clearSignoutTimer()
  AsyncStorage.removeItem('userData');
  return { type: SIGNOUT };
};
