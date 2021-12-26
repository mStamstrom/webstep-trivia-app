export type Quiz = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
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
export const createQuiz = async (
  amount: number,
  difficulty: string | undefined
) => {
  let url = `https://opentdb.com/api.php?amount=${amount}`;
  if (difficulty) {
    url += `&difficulty=${difficulty.toLocaleLowerCase()}`;
  }
  const response = await fetch(url);
  const responseJson: ApiQuizResponse = await response.json();
  if (responseJson.responseCode > 0) {
    throw new Error("Invalid request");
  }
  const mapResults: Quiz[] = responseJson.results.map((result) => ({
    correctAnswer: result.correct_answer,
    incorrectAnswers: result.incorrect_answers,
    ...result,
  }));
  return Promise.resolve(mapResults);
};
