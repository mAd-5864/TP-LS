import { React } from "react";

import "./ResetBoard.css";

export const ResetBoard = ({ resetBoard }) => {
    return (
        <button className="reset-btn" onClick={resetBoard}>RESET</button>
    )
}