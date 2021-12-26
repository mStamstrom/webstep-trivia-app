import { useEffect, useState } from "react";
import { Button } from "../../common/components/Button";
import { Dropdown } from "../../common/components/Dropdown";
import { Input } from "../../common/components/Input";
import {
  Category,
  fetchCategories,
} from "../../common/requests/categoriesRequest";
import styles from "./QuizForm.module.css";

const difficulityOptions = ["Any difficulty", "Easy", "Medium", "Hard"];

interface Props {
  onSubmit: (
    numberOfQuestions: number,
    difficulty: string | undefined,
    selectedCategory: undefined | Category
  ) => void;
}
export const QuizForm = ({ onSubmit }: Props) => {
  const [numberOfQuestion, setNumberOfQuestions] = useState(0);
  const [difficulity, setDifficulty] = useState<undefined | string>(undefined);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>();

  useEffect(() => {
    let isCancelled = false;
    const fetchData = async () => {
      if (!isCancelled) {
        setCategories(await fetchCategories());
      }
    };
    fetchData();
    return () => {
      isCancelled = true;
    };
  }, []);

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const foundCategory = categories.find((x) => x.name === value);
    if (foundCategory) {
      setSelectedCategory(foundCategory);
    }
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(numberOfQuestion, difficulity, selectedCategory);
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
        {categories.length > 0 && (
          <Dropdown
            label="Select category"
            options={categories.map((x) => x.name)}
            onChange={handleCategoryChange}
          />
        )}
        <div>
          <Button type="submit">Create quiz</Button>
        </div>
      </form>
    </div>
  );
};
