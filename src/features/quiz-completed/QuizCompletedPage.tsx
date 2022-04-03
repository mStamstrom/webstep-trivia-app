import { Button } from "../../common/components/Button";
import { Question } from "../../common/requests/quizRequest";

export const QuizCompletedPage = () => {
  const points = 10,
    questions = [];
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
