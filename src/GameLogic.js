const gameHelpers = {
  getCategories: async () => {
    const categories = await fetch(
      "https://tquiz-server.herokuapp.com/trivia/categories",
      {
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((data) => {
        return data.json();
      })
      .catch((err) => {
        return {
          error: true,
          message: "Error during categories fetch",
        };
      });

    return categories;
  },

  getQuestionsByCategory: async (category, gameType) => {
    const body = { id: category, type: gameType };
    const questions = await fetch(
      "https://tquiz-server.herokuapp.com/trivia/questions",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw data;
        }

        data.results.forEach((question) => {
          question.incorrect_answers = question.incorrect_answers.map(
            (answer) => {
              return (answer = window.atob(answer));
            }
          );
          question.incorrect_answers.push(window.atob(question.correct_answer));
          question.incorrect_answers.sort();
        });
        return data.results;
      })
      .catch((error) => {
        return error;
      });
    return questions;
  },
};

export default gameHelpers;
