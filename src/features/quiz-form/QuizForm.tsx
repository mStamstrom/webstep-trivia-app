import { useState } from "react";
import { Button } from "../../common/components/Button";
import { Dropdown } from "../../common/components/Dropdown";
import { Input } from "../../common/components/Input";
import styles from "./QuizForm.module.css";

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
      <form onSubmit={submitForm} className={styles.form}>
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
        <div>
          <Button type="submit">Create quiz</Button>
        </div>
      </form>
    </div>
  );
};
