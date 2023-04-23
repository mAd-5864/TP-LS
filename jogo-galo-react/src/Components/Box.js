import React from "react";
import './Box.css';

export const Box = ({ token, onClick }) => {
    const style = token === "X" ? "box x" : "box o";
    return (
        <button className={style} onClick={onClick}>{token}</button>
    )
}