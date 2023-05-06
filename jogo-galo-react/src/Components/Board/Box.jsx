import React from "react";
import './Box.css';

export const Box = ({ token, onClick, lastMove}) => {
    const symbol = token === "X" ? "box x" : "box o";
    return (
        <>
        {lastMove ? (
            <button style={{opacity:1}}className={symbol} onClick={onClick}>{token}</button>
            ) : (
            <button disabled style={{opacity:0.4}}className={symbol}>{token}</button>
        )}
    </>
    )
}