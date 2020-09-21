import React from "react";
import gameHelpers from "../../../GameLogic";

function Category(props) {
  const handleClick = () => {
    props.setIsLoading(true);

    async function getQuestions() {
      const questions = await gameHelpers.getQuestionsByCategory(
        props.id,
        props.type
      );

      if (questions.error) {
        props.setIsLoading(false);
        return props.setError(questions);
      }

      props.setQuestions(questions);
      props.setCategory(true);
      props.setCategories([]);
      props.setIsLoading(false);
    }
    getQuestions();
  };

  return (
    <div onClick={handleClick} className="btn category-box">
      {props.name}
    </div>
  );
}

export default Category;
