export const SIGNUP = "SIGNUP";
export const SIGNIN = "SIGNIN"

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
      throw new Error("Something went wrons!");
    }

    const data = await response.json();

    console.log(data);

    dispatch({ type: SIGNUP });
  };
};

export const signin = (email, password) => {
    return async (dispatch) => {
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDLrKSLkEyFrP4CTshgiI4MpM9_A5ABAio
        `, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        })

        if (!response.ok) {
          throw new Error("Something went wrong!")
        }

        const data = response.json();
        console.log(data);

        dispatch({ type: SIGNIN });
    }
}