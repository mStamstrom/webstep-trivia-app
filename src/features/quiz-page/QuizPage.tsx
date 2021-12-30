import { useState } from "react";
import { Button } from "../../common/components/Button";
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

  const points = answers.filter(
    (answer) => answer.answer.isCorrectAnswer
  ).length;

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

  const changeQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  return (
    <div>
      <div>
        <span>
          Points: {points} / {props.questions.length}
        </span>
        <span style={{ marginLeft: "100px" }}>
          Question: {currentQuestionIndex + 1} / {props.questions.length}
        </span>
      </div>
      <QuestionDisplay
        question={currentQuestion}
        userAnswer={currentUserAnswer?.answer}
        onAnswer={onAnswer}
      />
      <Button onClick={changeQuestion}>Next question</Button>
    </div>
  );
};
