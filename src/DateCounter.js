import { useReducer } from "react";

const initialState = { count: 0, step: 1 }

function reducer(state, action) {

  switch (action.type) {
    case 'inc':
      return { ...state, count: state.count + state.step };
    case 'dec':
      return { ...state, count: state.count - state.step }
    case 'setcount':
      return { ...state, count: action.payload }
    case 'setstep':
      return { ...state, step: action.payload }
    case 'reset':
      return initialState
    default:
      throw new Error("Unknown action")
  }
}

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { count, step } = state

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  function callActions(action, payload) {
    dispatch({ type: action, payload: payload })
  }

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={(e) => callActions("setstep", Number(e.target.value))}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={() => callActions("dec")}>-</button>
        <input value={count} onChange={(e) => callActions("setcount", Number(e.target.value))} />
        <button onClick={() => callActions("inc")}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={() => callActions("reset")}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
