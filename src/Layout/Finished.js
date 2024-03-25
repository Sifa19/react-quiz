export default function Finished({ score, highScore }) {
    const percentage = (score * 100) / 280;

    let emoji;
    if (percentage === 100) emoji = "🏅"
    if (percentage >= 80 && percentage < 100) emoji = "🎉"
    if (percentage >= 50 && percentage < 80) emoji = "😊"
    if (percentage >= 10 && percentage < 50) emoji = "🤨"
    if (percentage <= 10) emoji = "🤦"

    return <>
        <p className="option finised">
            <span>{emoji}</span>You scored {score}  out of 280
            ({percentage.toFixed(2)}%)
        </p>
        <p>
            (HighScore : {highScore})
        </p>
    </>

}