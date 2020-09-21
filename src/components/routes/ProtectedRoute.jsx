import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import authHelpers from "../../Auth";

import Loader from "./public/Loader";

const PrivateRoute = (props) => {
  const [loading, setIsLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function checkAuth() {
      const auth = await authHelpers.checkIfAuth();
      return auth;
    }

    checkAuth().then((response) => {
      if (response) {
        if (mounted) {
          setIsLoading(false);
          setAuthenticated(true);
        }
      } else {
        setIsLoading(false);
        setRedirect(true);
      }
    });

    return () => (mounted = false);
  }, []);

  return (
    <>
      {loading ? <Loader /> : null}
      {authenticated ? props.children : null}
      {redirect ? <Redirect to="/login" /> : null}
    </>
  );
};

export default PrivateRoute;
