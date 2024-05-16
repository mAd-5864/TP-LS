import React, { useState, useEffect } from 'react';
import './App.css';
import { Board } from './Components/Board/Board';
import { Reset } from './Components/Board/Reset';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [boardState, setBoardState] = useState({
    nLines: 9,
    nColumns: 9,
    nMines: 10,
  });

  const [board, setBoard] = useState(() => {
    const initialBoard = Array.from({ length: boardState.nLines }, () =>
      Array.from({ length: boardState.nColumns }, () => ({
        bomb: false,
        flag: false,
        clicked: false,
        proximityBombs: 0
      }))
    );
    return initialBoard;
  });

  const randInt = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const handleCellClick = (x, y) => {
    if (!gameOver) {
      setBoard(prevBoard => {
        const updatedBoard = [...prevBoard]; // Fazer um copia do board
        const clickedCell = updatedBoard[x][y];

        if (clickedCell.bomb) { // quaisquer verificacoes necessarias
          clickedCell.clicked = true;
          setGameOver(true)
        }

        return updatedBoard;
      });
      if (!gameStarted) {
        generateMines(x, y);
        setGameStarted(true);
      }
    }
  };

  const generateMines = (xClicked, yClicked) => {
    const newBoard = [...board];

    let minesPlaced = 0;
    while (minesPlaced < boardState.nMines) {
      let flag = false;
      const x = randInt(0, boardState.nLines);
      const y = randInt(0, boardState.nColumns);
      if ((x >= xClicked - 1 && x <= xClicked + 1) && (y >= yClicked - 1 && y <= yClicked + 1)) {
        flag = true;
      }

      if (!newBoard[x][y].bomb && !flag) {
        newBoard[x][y].bomb = true;
        minesPlaced++;
      }
    }
    console.log(minesPlaced + " bombas geradas\n");
    setBoard(newBoard);
  };


  const resetBoard = () => {
    setGameStarted(false)
    setGameOver(false)
    setBoard(() => {
      const initialBoard = Array.from({ length: boardState.nLines }, () =>
        Array.from({ length: boardState.nColumns }, () => ({
          bomb: false,
          flag: false,
          clicked: false,
          proximityBombs: 0
        }))
      );
      return initialBoard;
    })
  }

  return (
    <div className="App">
      <div className='panel'>
        <span>Tabuleiro {boardState.nLines}x{boardState.nColumns} </span>
        <span> Bombas: {boardState.nMines}</span>
      </div>
      <Board boardState={boardState} board={board} handleCellClick={handleCellClick} />
      <Reset resetBoard={resetBoard} />
    </div>
  );
}

export default App;
