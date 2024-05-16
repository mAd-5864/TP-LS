import React, { useEffect } from 'react';
import './Cell.css';

export const Cell = (cell) => {
    const handleClick = () => {
        cell.handleCellClick(cell.x, cell.y);
    };
    useEffect(()=>{
        if (cell.cellState.clicked) {
            handleClick()
        }
    },[cell.cellState.clicked])

    const clicked = cell.cellState.clicked ? " clicked " : "";
    return (

        //<button className={"cell nBombas" + cell.cellState.proximityBombs + clicked} onClick={handleClick}> {cell.cellState.bomb ? "*" : cell.cellState.proximityBombs && !cell.cellState.bomb ? cell.cellState.proximityBombs : " "} </button>
        <button className={"cell nBombas"+cell.cellState.proximityBombs+clicked} onClick={handleClick}> {cell.cellState.clicked ? cell.cellState.bomb ? "*": cell.cellState.proximityBombs ? cell.cellState.proximityBombs : " " : " "} </button>
    )
}