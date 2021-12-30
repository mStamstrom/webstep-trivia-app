import { Category } from "./categoriesRequest";

export type Answer = {
  isCorrectAnswer: boolean;
  answer: string;
};

export type Question = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  answers: Answer[];
};

interface ApiQuizResponse {
  responseCode: number;
  results: Array<{
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  }>;
}

const shuffleArray = (currentQuestions: Answer[]) => {
  return currentQuestions
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

function decodeEntities(encodedString: string): string {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = encodedString;
  return textArea.value;
}

export const createQuiz = async (
  amount: number,
  difficulty: string | undefined,
  category: undefined | Category
) => {
  let url = `https://opentdb.com/api.php?amount=${amount}`;
  if (difficulty) {
    url += `&difficulty=${difficulty.toLocaleLowerCase()}`;
  }
  if (category) {
    url += `&category=${category.id}`;
  }
  const response = await fetch(url);
  const responseJson: ApiQuizResponse = await response.json();
  if (responseJson.responseCode > 0) {
    throw new Error("Invalid request");
  }
  const mapResults: Question[] = responseJson.results.map((result) => {
    const answers = result.incorrect_answers.map((answer) => ({
      answer: decodeEntities(answer),
      isCorrectAnswer: false,
    }));
    answers.push({
      isCorrectAnswer: true,
      answer: decodeEntities(result.correct_answer),
    });
    return {
      ...result,
      answers: shuffleArray(answers),
      question: decodeEntities(result.question),
    };
  });
  return Promise.resolve(mapResults);
};
