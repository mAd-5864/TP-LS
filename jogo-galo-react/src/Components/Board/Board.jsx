import { React } from "react";
import { Box } from './Box';
import "./Board.css"

export const Board = ({ board, onClick, win, lastMove }) => {
    return (
        <div className={win==="winX" ? "board win x" : win==="winO" ? "board win o" : win==="empate" ? "board win empate" : "board"}>
            {board.map((token, ind) => {
                return <Box token={token} lastMove={lastMove} key={ind} onClick={() => onClick(ind)} />
            })}
        </div>
    )
}
