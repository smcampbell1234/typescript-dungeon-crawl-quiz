
const AMOUNT = 10;
const DIFFICULTY = "medium";

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string
}

const enum Category {
  GENERAL = 9,
  FILM = 11,
  MYTHOLOGY = 20,
  HISTORY = 23,
  COMICS = 29,
}

// add answers field to Question
export type ShuffledQuestion = Question & { answers: string[]}

const shuffleArray = (array: any[]) => {
  return [...array].sort(() => Math.random() - 0.5);
}

/**
 * @returns on success, returns array of Question objs with added answers field of shuffled answer strings / null on fail
 */
export const fetchData = async () => {
  const endpoint = `https://opentdb.com/api.php?amount=${AMOUNT}&category=${Category.COMICS}&difficulty=${DIFFICULTY}&type=multiple`;
  try {
    const response = await fetch(endpoint)
    const data = await response.json()
    // combine right and wrong answers
    return data.results.map((question: Question) => (
      {
        ...question,
        answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
      }
    ))
  } catch (err:any) {
    console.log(".... error fetching data : ",err)
    return null;
  }
}