import { useMemo, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { QuizContext } from "./common/contexts/QuizContext";
import { Category } from "./common/requests/categoriesRequest";
import { createQuiz, Question } from "./common/requests/quizRequest";
import { QuizCompletedPage } from "./features/quiz-completed/QuizCompletedPage";
import { QuizForm } from "./features/quiz-form/QuizForm";
import { QuizPage } from "./features/quiz-page/QuizPage";

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);

  const contextValue = useMemo(() => {
    return {
      questions,
      setQuestions,
    };
  }, [questions, setQuestions]);
  return (
    <div className="App">
      <QuizContext.Provider value={contextValue}>
        <Routes>
          <Route path="webstep-trivia-app">
            <Route index element={<QuizForm />}></Route>
            <Route path="quiz" element={<QuizPage />}></Route>
            <Route
              path="quiz-completed"
              element={<QuizCompletedPage />}
            ></Route>
          </Route>
        </Routes>
      </QuizContext.Provider>
    </div>
  );
}

export default App;
