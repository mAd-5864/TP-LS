import React, { useState } from 'react';
import './App.css';
import { Board } from './Components/Board/Board';
import { Reset } from './Components/Board/Reset';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [boardState] = useState({
    nLines: 9,
    nColumns: 9,
    nMines: 10
  });

  const nearbyCells = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1]
  ];

  const [board, setBoard] = useState(() => {
    const initialBoard = Array.from({ length: boardState.nLines }, () =>
      Array.from({ length: boardState.nColumns }, () => ({
        bomb: false,
        flag: 0,
        clicked: false,
        proximityBombs: 0
      }))
    );
    return initialBoard;
  });

  const randInt = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const checkWin = () => {
    let openCells = 0;
    for (let x = 0; x < boardState.nLines; x++) {
      for (let y = 0; y < boardState.nColumns; y++) {
        if (board[x][y].clicked) {
          openCells++;
        }
      }
    }
    if (openCells === (boardState.nLines * boardState.nColumns - boardState.nMines)) {
      setGameOver(true);
      console.log("You win!");
    }
  };

  const handleCellClick = (x, y) => {
    if (!gameOver && !board[x][y].flag) {
      if (!gameStarted) {
        generateMines(x, y);
        calcularBombasProximas(x, y);
        setGameStarted(true);
      }
      setBoard(prevBoard => {
        const updatedBoard = [...prevBoard]; // Fazer um copia do board
        const clickedCell = updatedBoard[x][y];
        let nFlags;

        if (clickedCell.clicked) {
          nFlags = calcularFlagsProximas(x, y)
        }
        clickedCell.clicked = true;
        if (clickedCell.bomb) { // quaisquer verificacoes necessarias
          setGameOver(true)
        }
        else if (!clickedCell.proximityBombs || clickedCell.proximityBombs === nFlags) {
          nearbyCells.forEach(([dx, dy]) => {
            const neighbourX = x + dx;
            const neighbourY = y + dy;
            if (neighbourX >= 0 && neighbourX < boardState.nColumns && neighbourY >= 0 && neighbourY < boardState.nLines) {
              if (!updatedBoard[neighbourX][neighbourY].flag) {
                updatedBoard[neighbourX][neighbourY].clicked = true
              }
            }
          });
        }
        return updatedBoard;
      });
      checkWin();
    }
  };
  const placeFlag = (x, y) => {
    if (!gameOver && !board[x][y].clicked) {
      setBoard(prevBoard => {
        const updatedBoard = prevBoard.map(row => row.map(cell => ({ ...cell })));
        const clickedCell = updatedBoard[x][y];

        clickedCell.flag++;
        if (clickedCell.flag === 3) clickedCell.flag = 0;

        return updatedBoard;
      });
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

  const calcularBombasProximas = () => {
    const newBoard = board.map((row, x) =>
      row.map((cell, y) => {
        let bombCount = 0;
        if (!board[x][y].bomb) {
          nearbyCells.forEach(([dx, dy]) => {
            const neighbourX = x + dx;
            const neighbourY = y + dy;

            if (neighbourX >= 0 && neighbourX < boardState.nColumns && neighbourY >= 0 && neighbourY < boardState.nLines) {
              if (board[neighbourX][neighbourY].bomb) {
                bombCount++;
              }
            }
          });
        }

        return {
          ...cell,
          proximityBombs: bombCount
        };
      })
    );

    setBoard(newBoard)
  };

  const calcularFlagsProximas = (x, y) => {
    let flagCount = 0;
    nearbyCells.forEach(([dx, dy]) => {
      const neighbourX = x + dx;
      const neighbourY = y + dy;

      if (neighbourX >= 0 && neighbourX < boardState.nColumns && neighbourY >= 0 && neighbourY < boardState.nLines) {
        if (board[neighbourX][neighbourY].flag === 1) {
          flagCount++;
        }
      }
    });
    return flagCount;
  }




  const resetBoard = () => {
    setGameStarted(false)
    setGameOver(false)
    setBoard(() => {
      const initialBoard = Array.from({ length: boardState.nLines }, () =>
        Array.from({ length: boardState.nColumns }, () => ({
          bomb: false,
          flag: 0,
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
      <Board boardState={boardState} board={board} handleCellClick={handleCellClick} placeFlag={placeFlag} />
      <Reset resetBoard={resetBoard} />
    </div>
  );
}

export default App;
