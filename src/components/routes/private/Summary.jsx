import React from "react";
import { Link } from "react-router-dom";

function Summary(props) {
  return (
    <div className="flex flex-col flex-ai-c flex-jc-se summary">
      <h2 className="instruction">
        You answered
        <span className="colored"> {props.correctAnswer} / 10 </span>
        questions correct!
      </h2>
      <h2 className="instruction">
        You have earned <span className="colored">{props.points} points!</span>
      </h2>
      <Link to="/dashboard">
        <button className="btn">Cool!</button>
      </Link>
    </div>
  );
}

export default Summary;
