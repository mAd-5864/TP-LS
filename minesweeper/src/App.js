import React, { useState } from 'react';
import './App.css';
import { Board } from './Components/Board/Board';

function App() {
  const [boardSize, setBoardSize] = useState(70);
  const [board, setBoard] = useState({
    size: boardSize,
    mines: 30,
    grid: Array(boardSize).fill(null)
  });

  function updateGrid(newGrid) {
    setBoard(prevBoard => ({
      ...prevBoard,
      grid: newGrid
    }));
  }

  return (
    <div className="App">
      <Board board={board} updateGrid={updateGrid}/>
      {console.log("Board:", board)}
    </div>
  );
}

export default App;
