import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import authHelpers from "../../../Auth";

import Error from "./Error";

function Login(props) {
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState({ error: false, message: "" });

  //CHECK IF ALREADY AUTHENTICATED
  useEffect(() => {
    let mounted = true;

    async function checkAuth() {
      const auth = await authHelpers.checkIfAuth();
      if (auth) {
        if (mounted) {
          setAuthenticated(true);
        }
      }
    }
    checkAuth();

    return () => (mounted = false);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    const name = document.getElementById("login").value;
    const password = document.getElementById("password").value;
    const givenUser = { name, password };
    if (!givenUser.name.trim() === "" || givenUser.password.trim() === "") {
      return setError({ error: true, message: "No empty fields" });
    }
    try {
      await authHelpers.login(givenUser).then((response) => {
        if (response.error) {
          throw response;
        } else {
          localStorage.setItem("name", response.username);
          props.setUser(true);
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
        <label className="label" htmlFor="login">
          Login:
        </label>
        <input type="text" id="login" />
        <label className="label" htmlFor="password">
          Password:
        </label>
        <input type="password" id="password" />

        <button className="btn login-btn" onClick={handleLogin} type="submit">
          GET IN
        </button>
      </form>
      {authenticated ? <Redirect to="/dashboard" /> : null}
    </>
  );
}

export default Login;
