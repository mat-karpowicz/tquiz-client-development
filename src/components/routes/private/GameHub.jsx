import React, { useEffect, useState } from "react";
import gameHelpers from "../../../GameLogic";

import Category from "./Category";
import Question from "./Question";
import Summary from "./Summary";
import Loader from "../public/Loader";
import Error from "../public/Error";

function GameHub(props) {
  const [gameType, setGameType] = useState({ set: false, type: "" });
  const [category, setCategory] = useState(false);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState({ error: false, message: "" });
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [points, setPoints] = useState(0);
  const [sumUp, setSumUp] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(0);

  useEffect(() => {
    let mounted = true;
    async function categories() {
      const categories = await gameHelpers.getCategories();
      if (mounted) {
        if (categories.error) {
          return setError({ error: true, message: categories.message });
        }
        setCategories(categories.trivia_categories);
        setIsLoading(false);
      }
    }
    categories();
    return () => (mounted = false);
  }, []);

  const handleGameType = (e) => {
    e.preventDefault();
    setGameType({ set: true, type: e.target.id });
  };

  const handleGameStart = () => {
    document.getElementById("start-div").classList.add("slide-out");
    setGameStarted(true);
  };

  const typePicker = (
    <div className="flex flex-ai-c flex-jc-se flex-col type-picker">
      <h2 className="instruction">First, choose type of questions:</h2>

      <div className="flex flex-ai-c flex-col flex-jc-se picker-btns">
        <button className="btn" id="multiple" onClick={handleGameType}>
          Standard (4 answers)
        </button>
        <button className="btn" id="boolean" onClick={handleGameType}>
          True / False
        </button>
      </div>
    </div>
  );

  const categoryPicker = (
    <>
      <h2 className="instruction">And now a Category</h2>
      <div className="category-container">
        {categories.map((category) => (
          <Category
            key={category.name}
            setCategory={setCategory}
            setQuestions={setQuestions}
            setIsLoading={setIsLoading}
            setCategories={setCategories}
            setError={setError}
            type={gameType.type}
            name={category.name}
            id={category.id}
          />
        ))}
      </div>
    </>
  );

  const gameStarter = (
    <div id="start-div" className="flex flex-ai-c flex-jc-c flex-col ready">
      <h2 className="instruction">Your game is ready!</h2>
      <button onClick={handleGameStart} className="btn">
        Bring it on!
      </button>
    </div>
  );

  const questionsDiv = (
    <Question
      type={gameType.type}
      answers={{ true: "True", false: "False" }}
      question={questions[questionNumber]}
      questionNumber={questionNumber}
      points={points}
      setPoints={setPoints}
      setGameStarted={setGameStarted}
      setQuestionNumber={setQuestionNumber}
      setCorrectAnswer={setCorrectAnswer}
      correctAnswer={correctAnswer}
      setSumUp={setSumUp}
    />
  );

  return (
    <>
      {loading ? <Loader /> : null}
      {error.error ? (
        <Error errorMessage={error.message} setError={setError} />
      ) : null}
      {!loading && !gameType.set ? typePicker : null}
      {gameType.set && categories.length !== 0 && !loading
        ? categoryPicker
        : null}
      {category ? gameStarter : null}
      {gameStarted ? questionsDiv : null}
      {sumUp ? <Summary points={points} correctAnswer={correctAnswer} /> : null}
    </>
  );
}

export default GameHub;
