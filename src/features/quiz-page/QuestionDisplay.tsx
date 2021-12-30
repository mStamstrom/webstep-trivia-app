import clsx from "clsx";
import { Answer, Question } from "../../common/requests/quizRequest";
import styles from "./QuestionDisplay.module.css";

interface Props {
  question: Question;
  userAnswer: Answer | undefined;
  onAnswer: (answer: Answer) => void;
}

export const QuestionDisplay = ({ question, userAnswer, onAnswer }: Props) => {
  return (
    <div>
      <h4 className={styles.question}>{question.question}</h4>
      <div className={styles.answerContainer}>
        {question.answers.map((answer, index) => (
          <button
            onClick={() => onAnswer(answer)}
            disabled={!!userAnswer}
            className={clsx([
              styles.answer,
              userAnswer && answer.isCorrectAnswer && styles.correctAnswer,
              userAnswer &&
                !userAnswer.isCorrectAnswer &&
                userAnswer.answer === answer.answer &&
                styles.wrongAnswer,
              userAnswer &&
                userAnswer.answer === answer.answer &&
                styles.selectedAnswer,
            ])}
          >
            <div className={styles.index}>{index + 1}</div>
            <div className={styles.answerText}>{answer.answer}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
