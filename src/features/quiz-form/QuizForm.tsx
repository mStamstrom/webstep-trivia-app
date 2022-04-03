import { useEffect, useState } from "react";
import { Button } from "../../common/components/Button";
import { Dropdown } from "../../common/components/Dropdown";
import { Input } from "../../common/components/Input";
import { useQuizContext } from "../../common/contexts/QuizContext";
import {
  Category,
  fetchCategories,
} from "../../common/requests/categoriesRequest";
import { createQuiz } from "../../common/requests/quizRequest";
import styles from "./QuizForm.module.css";
import { useNavigate } from "react-router-dom";

const difficulityOptions = ["Any difficulty", "Easy", "Medium", "Hard"];

export const QuizForm = () => {
  const [numberOfQuestion, setNumberOfQuestions] = useState(0);
  const [difficulity, setDifficulty] = useState<undefined | string>(undefined);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const navigate = useNavigate();

  const { setQuestions } = useQuizContext();

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

  const fetchTriviaGame = async (
    numberOfQuestions: number,
    difficulty: undefined | string,
    category: undefined | Category
  ) => {
    console.log(numberOfQuestions, difficulty);
    try {
      const res = await createQuiz(numberOfQuestions, difficulty, category);
      setQuestions(res);
      navigate("/webstep-trivia-app/quiz");
      console.log(res);
    } catch {
      console.error("could not create game");
    }
  };

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
    fetchTriviaGame(numberOfQuestion, difficulity, selectedCategory);
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
