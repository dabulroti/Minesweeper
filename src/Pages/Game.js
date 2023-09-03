import React, { useContext, useState, useEffect } from "react";
import "./DifficultySelect.css";
import Board from "./Board";
import Timer from "./Timer";
import "./Board.css";

function Game() {
    const [difficultyLevel, setDifficultyLevel] = useState("easy");
    const [reset, setReset] = useState(false);


    const onDifficultySelect = (type) => {
        setDifficultyLevel(type);
    };

    useEffect(() => {
        console.log("difficulty level changed");
        setReset(false);
        localStorage.removeItem("exploredArray")
        localStorage.removeItem("boardArray")
        localStorage.removeItem("timer")
    }, [reset]);

    

    return (
        <>
            <h1 className="title">Minesweeper</h1>
            <div className="difficulty-select-container">
                
                <button onClick={() =>  onDifficultySelect("easy")}>Easy</button>
                <button onClick={() => onDifficultySelect("medium")}>Medium</button>
                <button onClick={() => onDifficultySelect("hard")}>Hard</button>
            </div>
            {console.log(difficultyLevel)}
            <div id = "container"className="board-container">

            <div style={{ display: "flex", justifyContent: "center" }}>
        <Timer type={difficultyLevel} />

    </div>
    <div style={{ display: "flex", justifyContent: "center" }}>
        {/* reset button */}
        <button onClick={()=>{setReset(true)}} className="reset">Reset</button>
        </div>
            <Board type={difficultyLevel} />
            </div>
        </>
    );
}

//save the current state of the board in local storage and make a function to check that state befor making a new board


export default Game;
