import { Button } from "../../common/components/Button";
import { Question } from "../../common/requests/quizRequest";

interface Props {
  points: number;
  questions: Question[];
}

export const QuizCompletedPage = ({ points, questions }: Props) => {
  return (
    <div>
      <h1>You finished the quiz!</h1>

      <div>
        Your score was {points} / {questions.length} !
      </div>

      <Button onClick={() => window.location.reload()}>Play again</Button>
    </div>
  );
};
