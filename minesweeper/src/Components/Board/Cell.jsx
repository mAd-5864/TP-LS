import React, { useState } from 'react';
import './Cell.css';

export const Cell = (cell) => {
    const handleClick = () => {
        cell.handleCellClick(cell.x, cell.y);
    };

    return (

        <button className="cell" onClick={handleClick}> {cell.x},{cell.y} </button>

    )
}