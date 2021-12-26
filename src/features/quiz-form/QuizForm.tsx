import { useState } from "react";
import { Dropdown } from "../../common/components/Dropdown";
import { Input } from "../../common/components/Input";

const difficulityOptions = ["Any difficulty", "Easy", "Medium", "Hard"];

interface Props {
  onSubmit: (numberOfQuestions: number, difficulty: string | undefined) => void;
}
export const QuizForm = ({ onSubmit }: Props) => {
  const [numberOfQuestion, setNumberOfQuestions] = useState(0);
  const [difficulity, setDifficulty] = useState<undefined | string>(undefined);

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(e.target.value);
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(numberOfQuestion, difficulity);
  };
  return (
    <div>
      <h1>Quiz Form</h1>
      <form onSubmit={submitForm}>
        <Input
          type="number"
          label="Number of questions"
          onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
        />
        <Dropdown
          label="Select difficulty"
          options={difficulityOptions}
          onChange={handleDifficultyChange}
        />
        <button type="submit">Create quiz</button>
      </form>
    </div>
  );
};
