import { useState } from "react";
import { Question } from "../../common/requests/quizRequest";

interface Props {
  questions: Question[];
}

export const QuizPage = (props: Props) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currentQuestion = props.questions[currentQuestionIndex];

  return (
    <div>
      {currentQuestion.question}
      {currentQuestion.answers.map((answer) => (
        <button>{answer.answer}</button>
      ))}
    </div>
  );
};
