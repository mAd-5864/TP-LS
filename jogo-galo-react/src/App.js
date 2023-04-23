import React, { useState } from 'react';
import './App.css';
import { Board } from './Components/Board';
import { ResetBoard } from './Components/ResetBoard';

function App() {

  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  /* const board = Array(9 * 9).fill(null).map(() => Array(9 * 9).fill(null)); */
  /* [
    [[[null, null, null],[null, null, null], [null, null, null],],
    [[null, null, null], [null, null, null], [null, null, null],],
    [[null, null, null], [null, null, null], [null, null, null],]],
    [[[null, null, null],[null, null, null], [null, null, null],],
    [[null, null, null], [null, null, null], [null, null, null],],
    [[null, null, null], [null, null, null], [null, null, null],]],
    [[[null, null, null],[null, null, null], [null, null, null],],
    [[null, null, null], [null, null, null], [null, null, null],],
    [[null, null, null], [null, null, null], [null, null, null],]],
  ] */

  const BoxClick = (boxInd) => {
    const updatedBoard = board.map((token, ind) => {
      if (ind === boxInd) {
        return turn === true ? 'X' : 'O';
      } else {
        return token;
      }
    })
    setBoard(updatedBoard)
    setTurn(!turn)
  }
  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null));
    setTurn(true);
  }
  return (
    <div className="App">
      <div className='mainBoard'>
        {[...Array(9)].map((index) => (
          <Board board={board} key={index} onClick={gameOver ? resetBoard : BoxClick} />))}
      </div>
      <ResetBoard resetBoard={resetBoard} />
    </div>
  );
}

export default App;
