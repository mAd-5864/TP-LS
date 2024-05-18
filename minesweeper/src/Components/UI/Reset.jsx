import { React } from "react";

import "./Reset.css";

export const Reset = ({ resetBoard }) => {
    return (
        <button className="reset-btn" onClick={resetBoard}>RESET</button>
    )
}