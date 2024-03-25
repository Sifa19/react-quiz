export default function ScoreBar({ answer, score, count }) {
    return <div className="progress">
        <progress value={answer === -1 ? count : count + 1} max="15"> 32% </progress>
        <div>
            <span>Question {count + 1}/15</span>
            <span>{score}/280 points</span>
        </div>
    </div>
}