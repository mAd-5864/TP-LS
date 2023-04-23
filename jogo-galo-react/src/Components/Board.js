import { React } from "react";
import { Box } from './Box';
import "./Board.css"

export const Board = ({ board, onClick }) => {
    return (
        <div className="board">
            {board.map((token, ind) => {
                return <Box token={token} onClick={() => onClick(ind)} />
            })}
        </div>
    )
}