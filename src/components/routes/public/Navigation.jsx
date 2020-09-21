import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <>
      <nav className="nav">
        <div className="flex flex-jc-sb flex-ai-c link-container">
          <Link className="nav-link" to="/login">
            <h2>Login</h2>
          </Link>
          <Link className="nav-link username" to="/">
            <h2>Home</h2>
          </Link>
          <Link className="nav-link" to="/register">
            <h2>Register</h2>
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Navigation;
