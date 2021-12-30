import { Question } from "../../common/requests/quizRequest";
import styles from "./QuestionDisplay.module.css";

interface Props {
  question: Question;
}

export const QuestionDisplay = ({ question }: Props) => {
  return (
    <div>
      <h4 className={styles.question}>{question.question}</h4>
      <div className={styles.answerContainer}>
        {question.answers.map((answer, index) => (
          <button className={styles.answer}>
            <div className={styles.index}>{index + 1}</div>
            <div className={styles.answerText}>{answer.answer}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
