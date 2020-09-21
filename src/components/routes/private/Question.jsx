import React, { useState } from "react";

import authHelpers from "../../../Auth";

import Timer from "../public/Timer";

function Question(props) {
  const [timer, setTimer] = useState(true);

  const handleAnswer = (e) => {
    e.preventDefault();
    setTimer(false);

    let updatedPoints = props.points;
    const answers = document.getElementsByClassName("answer-btn");

    Array.from(answers).forEach((answer) => (answer.disabled = true));

    if (e.target.id === window.atob(props.question.correct_answer)) {
      e.target.classList.add("correct-answer");
      props.setPoints(props.points + 10);
      updatedPoints += 10;
      props.setCorrectAnswer(props.correctAnswer + 1);
    } else {
      e.target.classList.add("bad-answer");
      setTimeout(() => {
        Array.from(answers).forEach((answer) => {
          if (answer.id === window.atob(props.question.correct_answer)) {
            answer.classList.add("correct-answer");
          }
        });
      }, 1000);
    }

    setTimeout(async () => {
      const questionNumber = props.questionNumber;
      if (questionNumber === 9) {
        props.setGameStarted(false);
        document.getElementById("start-div").style.display = "none";
        await authHelpers.saveUser(updatedPoints);
        return props.setSumUp(true);
      }
      setTimer(true);

      Array.from(answers).forEach((answer) => {
        answer.disabled = false;
        answer.classList.remove("correct-answer");
        answer.classList.remove("bad-answer");
      });
      props.setQuestionNumber(questionNumber + 1);
    }, 2000);
  };

  const timesOut = () => {
    const updatedPoints = props.points;
    const answers = document.getElementsByClassName("answer-btn");
    Array.from(answers).forEach((answer) => (answer.disabled = true));

    setTimeout(() => {
      Array.from(answers).forEach((answer) =>
        answer.id === window.atob(props.question.correct_answer)
          ? answer.classList.add("correct-answer")
          : null
      );
    }, 1000);

    setTimeout(async () => {
      const questionNumber = props.questionNumber;
      if (questionNumber === 9) {
        props.setGameStarted(false);
        await authHelpers.saveUser(updatedPoints);
        document.getElementById("start-div").style.display = "none";
        return props.setSumUp(true);
      }
      setTimer(false);

      Array.from(answers).forEach((answer) => {
        answer.disabled = false;
        answer.classList.remove("correct-answer");
        answer.classList.remove("bad-answer");
      });
      setTimer(true);

      props.setQuestionNumber(questionNumber + 1);
    }, 2000);
  };

  return (
    <div id="question-container" className="question-container">
      <div className="question-box">
        <h2>{window.atob(props.question.question)}</h2>
      </div>
      <div className="answers-box">
        {props.type === "multiple" ? (
          props.question.incorrect_answers.map((answer) => (
            <button
              onClick={handleAnswer}
              id={answer}
              key={answer}
              className="answer-btn"
            >
              {answer}
            </button>
          ))
        ) : (
          <>
            <button onClick={handleAnswer} id="True" className="answer-btn">
              {props.answers.true}
            </button>
            <button onClick={handleAnswer} id="False" className="answer-btn">
              {props.answers.false}
            </button>
          </>
        )}
        {timer ? <Timer question={props.question} timesOut={timesOut} /> : null}
      </div>
    </div>
  );
}

export default Question;
