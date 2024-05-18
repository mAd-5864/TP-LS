import React from 'react';

import "./Header.css";
import { Clock } from './Clock';

export const Header = ({ boardState, totalFlags, gameOver, gameStarted, changeLevel }) => {

    return (
        <div className='panel'>
            <div className='values'>
                <h3>🚩: {boardState.nMines - totalFlags}</h3>
                <Clock gameOver={gameOver} gameStarted={gameStarted} />
            </div>
            <header>
                <h1 className="title">Minesweeper em React</h1>
                <span>Tabuleiro {boardState.nLines}x{boardState.nColumns} </span>
                <span>| {boardState.nMines} Bombas</span>
            </header>
            <div className='boardSelect'>
                    <button value={1} onClick={changeLevel}>Fácil</button>
                    <button value={2} onClick={changeLevel}>Médio</button>
                    <button value={3} onClick={changeLevel}>Difícil</button>
            </div>
        </div>
    )
}