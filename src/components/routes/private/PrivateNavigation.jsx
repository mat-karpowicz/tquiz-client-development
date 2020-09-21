import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import authHelpers from "../../../Auth";

function PrivateNavigation(props) {
  const [logoutRedirect, setLogoutRedirect] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();

    await authHelpers.logout().then((response) => {
      if (response) {
        localStorage.clear();
        props.setUser(false);
        setLogoutRedirect(true);
      }
    });
  };
  return (
    <nav className="nav">
      <div className="flex flex-jc-sb flex-ai-c link-container">
        <Link className="nav-link" to="/dashboard">
          <h2>Hub</h2>
        </Link>
        <h1 className="username">{localStorage.name}</h1>
        <Link className="nav-link" to="/">
          <h2 onClick={handleLogout}>Logout</h2>
        </Link>
      </div>
      {!logoutRedirect ? null : <Redirect to="/" />}
    </nav>
  );
}

export default PrivateNavigation;
