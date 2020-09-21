import React from "react";
import { Link } from "react-router-dom";
import TitleContainer from "./TitleContainer";

function Landing(props) {
  return (
    <div className="landing">
      <TitleContainer />
      <div className="flex flex-col flex-ai-c flex-jc-se landing-container">
        <Link to="/login">
          <button className="btn">Login</button>
        </Link>
        <Link to="/register">
          <button className="btn">Register</button>
        </Link>
        <Link onClick={props.toggleAbout} to="/">
          <button className="btn">About</button>
        </Link>
      </div>
    </div>
  );
}

export default Landing;
