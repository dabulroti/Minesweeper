import React from "react";
import Timer from "./Timer";
import "./Board.css";
import DifficultySelect from "./DifficultySelect";
import { useContext,createContext } from 'react';
import { gameTypeContext } from "../App";
import { convertToSeconds } from "./Timer";



const types = {
    "easy" : [10,10,20],
    "medium" : [15,15,50],
    "hard" : [20,20,100 ]
}

const exploredArray = [];

function BoardCreation(type) {
    var boardSize = types[type];
    var boardArray = [];
    var bombsArray = [];
 
    for (let i = 0; i < boardSize[0]; i++) {
        let row = [];
        for (let j = 0; j < boardSize[1]; j++) {
            row.push(0);
        }
        boardArray.push(row);
        
    }
    
    for (let i = 0; i < boardSize[2]; i++) {
        let x = Math.floor(Math.random() * boardSize[0]);
        let y = Math.floor(Math.random() * boardSize[1]);
        let bomb = [x, y];
        if (bombsArray.includes(bomb)) {
            i--;
        }
        else{
        bombsArray.push(bomb);
    }
    }
    //fill board array with bombs
    for (let i = 0; i < bombsArray.length; i++) {
        let x = bombsArray[i][0];
        let y = bombsArray[i][1];
        boardArray[x][y] = "💣";
    }
    //fill board array with numbers
    for (let i = 0; i < bombsArray.length; i++) {
        let x = bombsArray[i][0];
        let y = bombsArray[i][1];
        if (x > 0 && y > 0 && boardArray[x - 1][y - 1] !== "💣") {
            boardArray[x - 1][y - 1] = boardArray[x - 1][y - 1] + 1;
        }
        if (x > 0 && boardArray[x - 1][y] !== "💣") {
            boardArray[x - 1][y] = boardArray[x - 1][y] + 1;
        }
        if (x > 0 && y < boardSize[1] && boardArray[x - 1][y + 1] !== "💣") {
            boardArray[x - 1][y + 1] = boardArray[x - 1][y + 1] + 1;
        }
        if (y > 0 && boardArray[x][y - 1] !== "💣") {
            boardArray[x][y - 1] = boardArray[x][y - 1] + 1;
        }
        if (y < boardSize[1]-1 && boardArray[x][y + 1] !== "💣") {
            boardArray[x][y + 1] = boardArray[x][y + 1] + 1;
        }
        if (x < boardSize[0]-1 && y > 0 && boardArray[x + 1][y - 1] !== "💣") {
            boardArray[x + 1][y - 1] = boardArray[x + 1][y - 1] + 1;
        }
        if (x < boardSize[0]-1 && boardArray[x + 1][y] !== "💣") {
            boardArray[x + 1][y] = boardArray[x + 1][y] + 1;
        }
        if (x < boardSize[0]-1 && y < boardSize[1]-1 && boardArray[x + 1][y + 1] !== "💣") {
            boardArray[x + 1][y + 1] = boardArray[x + 1][y + 1] + 1;
        }
    }
    return boardArray; 

}


function Board({ type }) {

  const boardArray = localStorage.getItem("boardArray")!==null?JSON.parse(localStorage.getItem("boardArray")):BoardCreation(type);
  const exploredArray = localStorage.getItem("exploredArray")!==null?JSON.parse(localStorage.getItem("exploredArray")):[];
  //convert explored array to 2d array
  //   console.log(boardArray);

  function boardFontColor(i,j){
    var cell = boardArray[i][j];
      if(cell === 1){
          return "blue";
      }
      else if(cell === 2){
          return "green";
      }
      else if(cell === 3){
          return "red";
      }
      else if(cell === 4){
          return "purple";
      }
      else if(cell === 5){
          return "maroon";
      }
      else if(cell === 6){
          return "turquoise";
      }
      else if(cell === 7){
          return "black";
      }
      else if(cell === 8){
          return "gray";
      }
      else{
          return "black";
      }
  }

  function Explore(i, j) {

    document.getElementById(`board-button-${i}-${j}`).disabled = true;
    //change font color
    document.getElementById(`board-button-${i}-${j}`).style.color = boardFontColor(i,j);
    exploredArray.push([i,j]);
    localStorage.setItem("exploredArray", JSON.stringify(exploredArray));
    localStorage.setItem("boardArray", JSON.stringify(boardArray));
    localStorage.setItem("type", JSON.stringify(type));
    // localStorage.setItem("timer",JSON.stringify(document.getElementById("timer").innerHTML));

    localStorage.setItem("timer",JSON.stringify(convertToSeconds(document.getElementById("timer").innerHTML)));
    if(boardArray[i][j] === "💣"){
        //display all bombs
        localStorage.removeItem("exploredArray");
        localStorage.removeItem("boardArray");
        localStorage.removeItem("type");
        localStorage.removeItem("timer");

        for (let i = 0; i < boardArray.length; i++) {
            for (let j = 0; j < boardArray[i].length; j++) {
                //  if(boardArray[i][j] === "💣"){
                     boardArray[i][j]= boardArray[i][j] === 0 ? "" : boardArray[i][j];
                    document.getElementById(`board-button-${i}-${j}`).innerHTML = boardArray[i][j];
                    document.getElementById(`board-button-${i}-${j}`).disabled = true;
                    document.getElementById(`board-button-${i}-${j}`).style.color = "red"; 
                //  }               
                
            }
        }
        // gameOver();
    }
    else{
        if(boardArray[i][j] === 0 ){
            boardArray[i][j] = " ";
            if (i > 0 && j > 0 && boardArray[i - 1][j - 1] !== "💣") {
                Explore(i - 1, j - 1);
            }
            if (i > 0 && boardArray[i - 1][j] !== "💣") {
                Explore(i - 1, j);
            }
            if (i > 0 && j < 9 && boardArray[i - 1][j + 1] !== "💣") {
                Explore(i - 1, j + 1);
            }
            if (j > 0 && boardArray[i][j - 1] !== "💣") {
                Explore(i, j - 1);
            }
            if (j < 9 && boardArray[i][j + 1] !== "💣") {
                Explore(i, j + 1);
            }
            if (i < 9 && j > 0 && boardArray[i + 1][j - 1] !== "💣") {
                Explore(i + 1, j - 1);
            }
            if (i < 9 && boardArray[i + 1][j] !== "💣") {
                Explore(i + 1, j);
            }
            if (i < 9 && j < 9 && boardArray[i + 1][j + 1] !== "💣") {
                Explore(i + 1, j + 1);
            }
        }
        else{
             document.getElementById(`board-button-${i}-${j}`).innerHTML = boardArray[i][j];
        }
    }
  }

    return (
        <table className="board-table">
            <tbody>
                {boardArray.map((row, i) => (
                    <tr key={i}>
                        {row.map((cell, j) => {
                            const isExplored = exploredArray.some(
                                (coords) => coords[0] === i && coords[1] === j
                            );
                            return (
                                <td
                                    key={`${i}-${j}`}
                                    className="board-cell"
                                    backgroundColor="white"
                                >
                                    
                                    {isExplored ? (
                                        <>
                                            <button
                                                id={`board-button-${i}-${j}`}
                                                className="board-button"
                                                onClick={() => Explore(i, j)}
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    backgroundColor: "lightgray",
                                                    color: boardFontColor(i,j)
                                                }}
                                                disabled={exploredArray.some(coords => coords[0] === i && coords[1] === j)}
                                            >
                                                {boardArray[i][j]}
                                            </button>

                                            
                                            {/* call explore function */}
                                        </>
                                        
                                    ) : (
                                        <button
                                            id={`board-button-${i}-${j}`}
                                            className="board-button"
                                            onClick={() => Explore(i, j)}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                backgroundColor: "lightgray",
                                            }}
                                        />
                                    )}
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );

    

    // function buttoncheck(i,j){
    //     console.log("buttoncheck");
    //     if(exploredArray.some(coords => coords[0] === j && coords[1] === i)){
    //         console.log("explored");
    //         Explore(i,j);
    //     }
    // }
  
}

//bring a popup that says game over
function gameOver() {
    alert("Game Over");
}



export default Board;
