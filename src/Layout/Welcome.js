export default function Welcome({ noOfQuestion, dispatch }) {
    return <div className="welcome">
        <h1>Welcome to The React Quiz !</h1>
        <p>{noOfQuestion} questions to test your React Knowledge</p>
        <button className="btn" onClick={() => dispatch({ type: "start" })}>Let's start!</button>
    </div>
}