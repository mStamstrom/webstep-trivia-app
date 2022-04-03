import { createContext, useContext } from "react";
import { Question } from "../requests/quizRequest";

export interface QuizContextProps {
  questions: Question[];
  setQuestions: (questions: Question[]) => void;
}

const initialState = {
  questions: [],
  setQuestions: () => {},
};

export const QuizContext = createContext<QuizContextProps>(initialState);

export const useQuizContext = () => {
  return useContext(QuizContext);
};
