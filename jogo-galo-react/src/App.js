import React, { useState } from 'react';
import './App.css';
import { Board } from './Components/Board';
import { ResetBoard } from './Components/ResetBoard';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [boards, setBoards] = useState(Array(9).fill(board));
  const [turn, setTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  const boxClick = (boardInd, boxInd) => {
    const updatedBoards = boards.map((board, ind) => {
      if (ind === boardInd) {
        return board.map((token, i) => {
          if (i === boxInd && token == null) {
            setTurn(!turn);
            return turn ? 'X' : 'O';
          } else {
            return token;
          }
        });
      } else {
        return board;
      }
    });
    setBoards(updatedBoards);
    console.log(updatedBoards);
  }



  const resetBoard = () => {
    setGameOver(false);
    setBoards(Array(9).fill(Array(9).fill(null)));
    setTurn(true);
  }

  return (
    <div className="App">
      <div className='mainBoard'>
        {boards.map((value, boardInd) => (
          <Board
            key={boardInd}
            board={boards[boardInd]}
            onClick={gameOver ? resetBoard : (boxInd) => boxClick(boardInd, boxInd)}
          />
        ))}
      </div>
      <ResetBoard resetBoard={resetBoard} />
    </div>
  );
}

export default App;
