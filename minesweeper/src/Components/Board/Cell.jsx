import React, { useState } from 'react';
import './Cell.css';

export const Cell = ({ind}) => {
    const [cell, setCell] = useState({
        x: ind % 10,
        y: Math.floor(ind / 10),
        bomb: false,
        flag: false,
        proximityBombs: 0,
        clicked: false
    });
    return (

        <button className="cell">{cell.x},{cell.y} </button>

    )
}