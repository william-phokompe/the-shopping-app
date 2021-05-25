export const SIGNUP = "SIGNUP";
export const SIGNIN = "SIGNIN";

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

    dispatch({ type: SIGNUP, token: data.idToken, userId: data.localId });
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
      const errorId = errorResponse.error.message;
      let message = "Something went wrong!";

      if (errorId === "EMAIL_NOT_FOUND") {
        message = "This email could not be found!";
      } else if (errorId === "INVALID_PASSWORD") {
        message = "Password is not valid";
      }

      throw new Error(message);
    }

    const data = await response.json();

    dispatch({ type: SIGNIN, token: data.idToken, userId: data.localId });
  };
};
