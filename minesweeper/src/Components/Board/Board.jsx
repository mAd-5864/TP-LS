import React from "react";
import './Board.css';
import { Cell } from "./Cell";

export const Board = ({ boardState, handleCellClick }) => {
    let ind = 0;
    let arrayBoard = []
    for (let i = 0; i < boardState.nLines; i++) {
        let row = []
        for (let j = 0; j < boardState.nColumns; j++) {
            row.push(< Cell key={ind++} x={i} y={j} handleCellClick={handleCellClick} />)
        }
        let rowClass = i % 2 === 0 ? " even " : " odd "
        arrayBoard.push(<div key={i} className={"linha" + rowClass}>{row}</div>)
    }

    return (
        <div className="board">
            {arrayBoard}
        </div>
    )
}