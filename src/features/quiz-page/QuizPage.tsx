import { useState } from "react";
import { Answer, Question } from "../../common/requests/quizRequest";
import { QuestionDisplay } from "./QuestionDisplay";
interface Props {
  questions: Question[];
}

interface UserAnswer {
  question: string;
  answer: Answer;
}

export const QuizPage = (props: Props) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);

  const currentQuestion = props.questions[currentQuestionIndex];
  const currentUserAnswer: UserAnswer | undefined =
    answers[currentQuestionIndex];

  const onAnswer = (selectedAnswer: Answer) => {
    setAnswers([
      ...answers,
      {
        question: currentQuestion.question,
        answer: selectedAnswer,
      },
    ]);
  };

  return (
    <div>
      <div>
        user has answered:{" "}
        {currentUserAnswer ? currentUserAnswer.answer.answer : "No answer yet!"}
      </div>
      <QuestionDisplay
        question={currentQuestion}
        userAnswer={currentUserAnswer?.answer}
        onAnswer={onAnswer}
      />
    </div>
  );
};
