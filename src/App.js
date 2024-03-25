import { useEffect, useReducer, useState } from "react";
import "./style.css";

import DateCounter from "./DateCounter";

import Loader from "./components/Loader";
import Error from "./components/Error";
import Header from "./Layout/Header";
import Welcome from "./Layout/Welcome";
import Quiz from "./Layout/Quiz";
import ScoreBar from "./Layout/ScoreBar";
import Timer from "./components/Timer";
import Button from "./components/Button";

import Footer from "./Layout/Footer";
import Container from "./Layout/Container";
import Finished from "./Layout/Finished";

const SECS_PER_QUESTION = 30

const initialState = {
  questions: [],
  //'loading','error','ready','active','finished'
  status: "loading",
  currentQuestionIndx: 0,
  score: 0,
  answer: -1,
  highScore: 0,
  timer: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case 'dataFailed':
      return {
        ...state,
        status: "error",
      };
    case 'start':
      return {
        ...state,
        status: "active",
        timer: state.questions.length * SECS_PER_QUESTION
      };
    case 'finished':
      const newHighScore = localStorage.getItem("highScore") < state.score ? state.score : localStorage.getItem("highScore")
      localStorage.setItem("highScore", newHighScore)
      console.log(newHighScore);
      return {
        ...state,
        status: "finished",
        highScore: newHighScore
      };
    case 'nextQuestion':
      return {
        ...state,
        currentQuestionIndx: state.currentQuestionIndx + 1,
        answer: -1
      };
    case 'answer':
      return {
        ...state,
        answer: action.payload
      };
    case 'correctAnswer':
      return {
        ...state,
        score: state.score + 10
      };
    case 'restart':
      return {
        ...initialState,
        questions: state.questions,
        status: "ready"
      }
    case 'timer':
      return {
        ...state,
        timer: state.timer - 1,
        status: state.timer === 0 ? "finished" : state.status
      }
    default:
      console.log("error occured");
  }
}

function App() {

  const [{ questions, status, currentQuestionIndx, answer, score, highScore, timer }, dispatch] = useReducer(reducer, initialState);
  const noOfQuestion = questions.length


  useEffect(
    function () {
      async function getQuestions() {

        try {
          const res = await fetch("http://localhost:8000/questions");
          const data = await res.json();
          dispatch({ type: "dataReceived", payload: data });
        } catch (error) {
          dispatch({ type: "dataFailed" })
        }
      }

      getQuestions();

    },
    []
  );

  return (

    <Container>
      <Header />
      {
        status === 'loading' && <Loader />
      }
      {
        status === 'error' && <Error />
      }
      {
        status === 'ready' &&
        <Welcome
          noOfQuestion={noOfQuestion}
          dispatch={dispatch} />
      }
      {
        status === 'active' &&
        <>
          <ScoreBar
            answer={answer}
            score={score}
            count={currentQuestionIndx} />
          <Quiz
            key={(Math.random() * 500).toFixed(3)}
            question={questions[currentQuestionIndx]}
            dispatch={dispatch}
            answer={answer}
          />
          <Footer>
            <Timer timer={timer} dispatch={dispatch} />
            {answer !== -1 && (
              <Button
                onClickHandler={() => {
                  if (currentQuestionIndx === 14)
                    dispatch({ type: "finished" })
                  dispatch({ type: "nextQuestion" })
                }
                }>
                {currentQuestionIndx === 14 ? "Finish" : "Next"}</Button>
            )}
          </Footer>
        </>
      }
      {
        status === 'finished' &&
        <>
          <Finished score={score} highScore={highScore} />
          <br />
          <button
            className="btn"
            onClick={() => dispatch({ type: "restart" })}
          >Restart Quiz
          </button>
        </>
      }
    </Container>
  );
}

export default App;
