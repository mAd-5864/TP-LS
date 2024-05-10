import React from "react";
import './Board.css';
import { Cell } from "./Cell";

export const Board = ({board, updateGrid}) => {
    return (
        <div className="board">
            {board.grid.map((token, ind) => {
                return <Cell key={ind} ind={ind}/>;
            })}

        </div>
    )
}