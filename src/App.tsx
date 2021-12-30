import { useState } from "react";
import "./App.css";
import { Category } from "./common/requests/categoriesRequest";
import { createQuiz, Question } from "./common/requests/quizRequest";
import { QuizForm } from "./features/quiz-form/QuizForm";
import { QuizPage } from "./features/quiz-page/QuizPage";

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const fetchTriviaGame = async (
    numberOfQuestions: number,
    difficulty: undefined | string,
    category: undefined | Category
  ) => {
    console.log(numberOfQuestions, difficulty);
    try {
      const res = await createQuiz(numberOfQuestions, difficulty, category);
      setQuestions(res);
      console.log(res);
    } catch {
      console.error("could not create game");
    }
  };
  return (
    <div className="App">
      {questions.length > 0 ? (
        <QuizPage questions={questions} />
      ) : (
        <QuizForm onSubmit={fetchTriviaGame} />
      )}
    </div>
  );
}

export default App;
