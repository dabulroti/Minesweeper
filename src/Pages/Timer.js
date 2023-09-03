import React, { useState, useEffect } from "react";
import "./Timer.css";

const types = {
  easy: [600],
  medium: [900],
  hard: [1200],
};

const convertToSeconds = (time) => {
    const minutes = time.split(":")[0];
    const seconds = time.split(":")[1];
    return parseInt(minutes * 60) + parseInt(seconds);
}
function Timer({ type, onTimeUp }) {
    const [timeLeft, setTimeLeft] = useState(localStorage.getItem("timer")!==null?localStorage.getItem("timer"):types[type]);

    const convertToMMSS = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }


    useEffect(() => {
        if (timeLeft === 0) {
            onTimeUp();
            return;
        }

        const timer = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft, onTimeUp]);

    return <>Time Left: <p id="timer"className="timer">{convertToMMSS(timeLeft)}</p></>
}

// function timerCheck(timeLeft){
//     if(localStorage.getItem("timer")!==null){
//         return localStorage.getItem("timer");
//     }
//     else{
//         return convertToMMSS(timeLeft);
//     }

// }

export { Timer, convertToSeconds };
export default Timer;