import React, { useEffect } from 'react';
import './Cell.css';

export const Cell = (cell) => {
    const handleClick = () => {
        cell.handleCellClick(cell.x, cell.y);
    };

    const handleFlag = (event) => {
        if (event.preventDefault !== undefined) event.preventDefault();
        if (event.stopPropagation !== undefined) event.stopPropagation();
        cell.placeFlag(cell.x, cell.y);
    };

    useEffect(() => {
        if (cell.cellState.clicked) {
            handleClick();
        }
    }, [cell.cellState.clicked]);

    const clicked = cell.cellState.clicked ? " clicked " : "";
    let displayValue;

    if (cell.cellState.clicked) {
        if (cell.cellState.bomb) {
            displayValue = "💣"; //💥
        } else if (cell.cellState.proximityBombs) {
            displayValue = cell.cellState.proximityBombs;
        } else {
            displayValue = " ";
        }
    } else {
        if (cell.cellState.flag === 1) {
            displayValue = "🚩";
        } else if (cell.cellState.flag === 2) {
            displayValue = "?";
        } else {
            displayValue = " ";
        }
    }

    return (
        <button className={`cell nBombas${cell.cellState.proximityBombs}${clicked}`} onClick={handleClick} onContextMenu={handleFlag}>{displayValue}    </button>
    );
};
