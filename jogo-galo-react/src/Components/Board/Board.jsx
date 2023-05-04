import { React } from "react";
import { Box } from './Box';
import "./Board.css"

export const Board = ({ board, onClick, win }) => {
    return (
        <div className={win=="winX" ? "board win x" : win=="winO" ? "board win o" : "board"}>
            {board.map((token, ind) => {
                return <Box token={token} key={ind} onClick={() => onClick(ind)} />
            })}
        </div>
    )
}
