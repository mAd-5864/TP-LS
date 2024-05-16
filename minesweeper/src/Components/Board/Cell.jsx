import React, { useState } from 'react';
import './Cell.css';

export const Cell = (cell) => {
    const handleClick = () => {
        cell.handleCellClick(cell.x, cell.y);
        console.log(`Cell: ${cell.x},${cell.y}`);
        console.log(cell.cellState);
    };
    return (

        <button className="cell" onClick={handleClick}> {cell.cellState.bomb ? "*":" "} </button>

    )
}