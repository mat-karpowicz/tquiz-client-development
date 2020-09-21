import React, { useState, useEffect } from "react";
import authHelpers from "../../../Auth";
import { Redirect } from "react-router-dom";

import Error from "./Error";

function Register() {
  const [authenticated, setAuthenticated] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState({ error: false, message: "" });

  //CHECK IF USER IS AUTHENTICATED AND IF SO REDIRECT TO DASHBOARD
  useEffect(() => {
    async function checkAuth() {
      const auth = await authHelpers.checkIfAuth();
      if (auth) setAuthenticated(true);
    }
    checkAuth();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("password-confirm").value;
    const newUser = { name, password, passwordConfirm };

    if (
      newUser.name.trim() === "" ||
      newUser.password.trim() === "" ||
      newUser.passwordConfirm.trim() === ""
    ) {
      return setError({ error: true, message: "No empty fields" });
    }

    if (
      newUser.name.trim().length < 3 ||
      newUser.password.trim().length < 5 ||
      newUser.passwordConfirm.trim().length < 5
    ) {
      return setError({
        error: true,
        message:
          "Username needs to be at least 3 characters long and password at least 5",
      });
    }
    try {
      await authHelpers.register(newUser).then((response) => {
        if (response.error) {
          throw response;
        } else {
          setUserCreated(true);
        }
      });
    } catch (error) {
      setError({ error: true, message: error.message });
    }
  };

  return (
    <>
      {error.error ? (
        <Error errorMessage={error.message} setError={setError} />
      ) : null}
      <form className="flex flex-col login-container">
        <label htmlFor="name">Name: </label>
        <input type="text" id="name" />

        <label htmlFor="password">Password: </label>
        <input type="password" id="password" />

        <label htmlFor="password-confirm">Confirm password: </label>
        <input type="password" id="password-confirm" />

        <button className="btn login-btn" onClick={handleRegister}>
          Register
        </button>
      </form>

      {authenticated ? <Redirect to="/dashboard" /> : null}
      {userCreated ? <Redirect to="/login" /> : null}
    </>
  );
}
export default Register;
