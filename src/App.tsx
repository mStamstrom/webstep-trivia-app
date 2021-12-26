import { useState } from "react";
import "./App.css";
import { Category } from "./common/requests/categoriesRequest";
import { createQuiz, Quiz } from "./common/requests/quizRequest";
import { QuizForm } from "./features/quiz-form/QuizForm";

function App() {
  const [questions, setQuestions] = useState<Quiz[]>([]);
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
      <QuizForm onSubmit={fetchTriviaGame} />
    </div>
  );
}

export default App;
