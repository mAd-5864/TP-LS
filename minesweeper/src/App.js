import React, { useState, useEffect } from 'react';
import './App.css';
import { Board } from './Components/Board/Board';

function App() {
  const [boardState, setBoardState] = useState({
    nLines: 9,
    nColumns: 9,
    nMines: 30,
  });

  const [board, setBoard] = useState(() => {
    const initialBoard = Array.from({ length: boardState.nLines }, () =>
      Array.from({ length: boardState.nColumns }, () => ({
        bomb: false,
        flag: false,
        clicked: false,
        proximityBombs: 0,
      }))
    );
    return initialBoard;
  });

  const randInt = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const handleCellClick = (x, y) => {
    setBoard(prevBoard => {
      const updatedBoard = [...prevBoard]; // Fazer um copia do board
      const clickedCell = updatedBoard[x][y];

      if (clickedCell) { // quaisquer verificacoes necessarias
        clickedCell.clicked = true;
      }

      return updatedBoard;
    });
  };

  const generateMines = () => {
    const newBoard = [...board]

    let minesPlaced = 0;
    while (minesPlaced < boardState.nMines) {
      const x = randInt(0, boardState.nLines);
      const y = randInt(0, boardState.nColumns);

      if (!newBoard[x][y].bomb) {
        newBoard[x][y].bomb = true;
        minesPlaced++;
      }
    }

    setBoard(newBoard);
  };

  useEffect(() => {
    generateMines();
  }, []);

  return (
    <div className="App">
      <Board boardState={boardState} handleCellClick={handleCellClick} />
      {console.log("Board:", board)}
    </div>
  );
}

export default App;
