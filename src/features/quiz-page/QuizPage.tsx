import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../common/components/Button";
import { useQuizContext } from "../../common/contexts/QuizContext";
import { Answer, Question } from "../../common/requests/quizRequest";
import { QuizCompletedPage } from "../quiz-completed/QuizCompletedPage";
import { QuestionDisplay } from "./QuestionDisplay";
import styles from "./QuizPage.module.css";

interface UserAnswer {
  question: string;
  answer: Answer;
}

export const QuizPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const { questions } = useQuizContext();
  const navigate = useNavigate();

  const points = answers.filter(
    (answer) => answer.answer.isCorrectAnswer
  ).length;

  const currentQuestion = questions[currentQuestionIndex];
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
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex >= questions.length) {
      navigate("/webstep-trivia-app/quiz-completed");
    } else {
      setCurrentQuestionIndex(nextQuestionIndex);
    }
  };

  return (
    <div>
      <div>
        <span>
          Points: {points} / {questions.length}
        </span>
        <span className={styles.question}>
          Question: {currentQuestionIndex + 1} / {questions.length}
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
