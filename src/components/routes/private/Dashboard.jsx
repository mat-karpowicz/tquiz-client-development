import React from "react";
import { Link } from "react-router-dom";

function Dashboard(props) {
  return (
    <div className="dashboard-container">
      <div className="dashboard-points">
        <div className="flex flex-jc-sb points">
          <h2 className=" stat">Points: </h2>
          <h3 className="stat-value">{localStorage.getItem("points")}</h3>
        </div>
        <div className="flex flex-jc-sb points">
          <h2 className="stat">Member Since: </h2>
          <h3 className="stat-value">
            {localStorage.getItem("created").substring(0, 10)}
          </h3>
        </div>
      </div>
      <div className="flex flex-col flex-ai-c buttons-container">
        <Link to="/game">
          <button className="btn">Play Game</button>
        </Link>
        <Link onClick={props.toggleAbout} to="/dashboard">
          <button className="btn">About</button>
        </Link>
      </div>
    </div>
  );
}
export default Dashboard;
