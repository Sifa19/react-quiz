import { useEffect } from "react"

export default function Timer({ timer, dispatch }) {

    const mins = Math.floor(timer / 60)
    const secs = timer % 60
    useEffect(function () {
        const id = setInterval(function () {
            dispatch({ type: "timer" })
        }, 1000)
        return () => clearInterval(id)
    }, [dispatch])


    return <button className="btn">
        {mins < 10 && "0"}{mins}:{secs < 10 && "0"}{secs}
    </button>
}