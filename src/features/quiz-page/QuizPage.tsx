import { useState } from "react";
import { Question } from "../../common/requests/quizRequest";
import { QuestionDisplay } from "./QuestionDisplay";
interface Props {
  questions: Question[];
}

export const QuizPage = (props: Props) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currentQuestion = props.questions[currentQuestionIndex];

  return (
    <div>
      <QuestionDisplay question={currentQuestion} />
    </div>
  );
};
