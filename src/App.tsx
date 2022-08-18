import React, {useState, useEffect} from 'react';
// api
import { fetchData } from "./api/questionBank";
// types
import { ShuffledQuestion } from "./api/questionBank";

// style
import './App.css';

function App() {
  const [questions, setQuestions] = useState<ShuffledQuestion[]>([]);
  const [number, setNumber] = useState(0);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [currQuestion, setCurrQuestion] = useState<ShuffledQuestion | null>(null)
  const [currAnswer, setCurrAnswer] = useState<string | null> (null)
  const [answers, setAnswers] = useState<string[]>([])
  const [correctCount, setCorrectCount] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  
  const getData = async () => {
    await fetchData().then((response) => {
      if (response) {
        setQuestions(response)
        setCurrQuestion(response[0])
        setCurrAnswer(null)
        setHasAnswered(false)
        setIsCorrect(false)
        setNumber(0) 
        setAnswers([])
        setCorrectCount(0)
      } else {
        console.log("............ Fetching data failed")
      }
    })
  }

  const selectAnswer = (answer: string) => {
    if (currQuestion?.correct_answer === answer) {
      setIsCorrect(true)
      setCorrectCount(prev => correctCount + 1)
    }
    else {
      setIsCorrect(false)
    }
    setHasAnswered(true)
    setCurrAnswer(answer)
    setAnswers([...answers,answer])
    if (number + 1 === questions.length) {
      // quiz is finished
      setIsFinished(true)
    }
  }

  useEffect(() => {
    getData();
  },[])

  const handNextQuestion = () => {
    if (number + 1 === questions.length) {
      // quiz is finished
      setIsFinished(true)
    }
    setCurrQuestion(questions[number + 1])
    setNumber(prev => number + 1)
    setCurrAnswer(null)
    setHasAnswered(false)
    setIsCorrect(false)
  }

  const handleStartOver = () => {
    setIsFinished(false)
    getData()
  }

  const getBtnState = (answer: string) => {
    // base style
    let answBtnState = "btn";
    if (!hasAnswered) {
      // if hasn't answered set to default
      answBtnState += " unanswered"
    } else if (currQuestion?.correct_answer === answer) {
      // if answered and correct, mark green
      answBtnState += " correct"
    } else if (!isCorrect && currAnswer === answer) {
      // if answered incorrect mark selected red and mark correct answer green
      answBtnState += " incorrect"
    }
    return answBtnState;
  }

  return (
    <div className="App">
      <header>
        <p className="subheader">Brought to you by Forbidden Runes and Crom's Dungeon Crawl</p>
        <h1 className="blackCastle-font header">The Dungeon Crawl</h1>
      </header>
      {
        isFinished ?

        <main className="cards-holder">
          <section className="final-score-holder">
            <h1 className="blackCastle-font final-score" >Score {correctCount}</h1>
            <br />
            <h1 className="font-two">You Correctly Answered</h1>
            <h1 className="font-two">{correctCount} Out Of {questions.length}</h1>
            <h1 className="font-two">Questions</h1>
          </section>
          <section>
            <button className="next-question" onClick={handleStartOver} >
              New Game
            </button>
          </section>
        </main>
        :
        <main className="cards-holder">
          <section className="question-card">
            <section className="scoreboard">
              <span className="blackCastle-font">Score: {correctCount}</span>
              <span className="blackCastle-font">Q: {number + 1} / {questions.length}</span>
            </section>
            <h1 dangerouslySetInnerHTML={{ __html: !!currQuestion ? currQuestion?.question : ""}} />
          </section>
          <section className="answers-card">
            {
              currQuestion?.answers.map((answer: string ) => {
                return ( 
                  <button 
                    key={answer}
                    disabled={hasAnswered}
                    className={getBtnState(answer)}
                    onClick={() => selectAnswer(answer)}
                    dangerouslySetInnerHTML={{__html: answer}} 
                  />
                )
              })
            }
          </section>
          <section>
            <button className="next-question" onClick={handNextQuestion} >
              Next Question
            </button>
          </section>
        </main>
      }
    </div>
  );
}

export default App;