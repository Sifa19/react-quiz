
export default function Quiz({ question, answer, dispatch }) {

    const hasAnswered = answer !== -1;

    function handleOnClick(index) {
        dispatch({ type: "answer", payload: index })

        if (question.correctOption === index)
            dispatch({ type: "correctAnswer" })
    }

    return <div className="quiz">
        <h3 className="question">
            {question.question}
        </h3>
        <div className="options">
            {question.options.map((option, index) => {
                return <button
                    key={index}
                    className={`option
                    ${answer === index ? 'answer' : ''}
                    ${hasAnswered ?
                            question.correctOption === index ?
                                "correct" : "wrong"
                            : ""}`
                    }
                    onClick={() => handleOnClick(index)}
                    disabled={hasAnswered}
                >
                    {option}
                </button>
            })}
        </div>
    </div >
}