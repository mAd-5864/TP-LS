import React, { useState, useEffect } from 'react';
import './App.css';
import { Board } from './Components/Board/Board';
import { Reset } from './Components/UI/Reset';
import { Header } from './Components/UI/Header';
import GameOver from './Components/UI/GameOver';
import explosao from "./Components/Audio/bomboclat.mp3"
import cheer from "./Components/Audio/cheer.mp3"

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [soundMuted, setSoundMuted] = useState(false);
  const [totalFlags, setTotalFlags] = useState(0);
  const [level, setLevel] = useState(1);
  const [boardState, setBoardState] = useState({
    nLines: 9,
    nColumns: 9,
    nMines: 10
  });

  const createInitialBoard = (state) => {
    return Array.from({ length: state.nLines }, () =>
      Array.from({ length: state.nColumns }, () => ({
        bomb: false,
        flag: 0,
        clicked: false,
        proximityBombs: 0
      }))
    );
  };
  const [board, setBoard] = useState(() => createInitialBoard(boardState));

  useEffect(() => {
    setBoard(createInitialBoard(boardState));
    setGameStarted(false);
    setGameOver(false);
    setTotalFlags(0);
  }, [boardState]);


  const nearbyCells = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1]
  ];

  const randInt = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const checkWin = () => {
    let openCells = 0;
    let flagCount = 0;
    for (let x = 0; x < boardState.nLines; x++) {
      for (let y = 0; y < boardState.nColumns; y++) {
        if (board[x][y].clicked || board[x][y].bomb) {
          openCells++;
        }
        if (board[x][y].flag === 1) {
          flagCount++;
        }
      }
    }
    if (openCells === (boardState.nLines * boardState.nColumns)) {
      handleGameEnd(true);
    }
    setTotalFlags(flagCount);
  };

  useEffect(() => {
    checkWin();
  }, [board]);

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
          handleGameEnd(false);
        }
        else if (!clickedCell.proximityBombs || clickedCell.proximityBombs === nFlags) {
          nearbyCells.forEach(([dx, dy]) => {
            const neighbourX = x + dx;
            const neighbourY = y + dy;
            if (neighbourX >= 0 && neighbourX < boardState.nLines && neighbourY >= 0 && neighbourY < boardState.nColumns) {
              if (!updatedBoard[neighbourX][neighbourY].flag) {
                updatedBoard[neighbourX][neighbourY].clicked = true
              }
            }
          });
        }
        return updatedBoard;
      });
    }
  };
  const placeFlag = (x, y) => {
    if (!gameOver && !board[x][y].clicked) {
      setBoard(prevBoard => {
        const updatedBoard = prevBoard.map(row => row.map(cell => ({ ...cell })));
        const clickedCell = updatedBoard[x][y];

        clickedCell.flag++;
        if (clickedCell.flag === 3) clickedCell.flag = 0;
        else if (clickedCell.flag===1 && totalFlags===boardState.nMines) {
          clickedCell.flag--;
        }

        return updatedBoard;
      });
    }
  };

  const generateMines = (xClicked, yClicked) => {
    const newBoard = [...board];
    const maxMines = boardState.nLines * boardState.nColumns - 9;

    let minesPlaced = 0;
    if (boardState.nMines > maxMines) {
      setBoardState({
        ...boardState,
        nMines: maxMines
      })
    }
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
      if (minesPlaced >= maxMines) {
        break
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

            if (neighbourX >= 0 && neighbourX < boardState.nLines && neighbourY >= 0 && neighbourY < boardState.nColumns) {
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
      if (neighbourX >= 0 && neighbourX < boardState.nLines && neighbourY >= 0 && neighbourY < boardState.nColumns) {
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
    setBoard(createInitialBoard(boardState))
  }

  const changeLevel = (level) => {
    let newBoardState = {};
    switch (level) {
      case 1:
        newBoardState = {
          nLines: 9,
          nColumns: 9,
          nMines: 10,
        };
        break;
      case 2:
        newBoardState = {
          nLines: 16,
          nColumns: 16,
          nMines: 40,
        };
        break;
      case 3:
        newBoardState = {
          nLines: 16,
          nColumns: 30,
          nMines: 99,
        };
        break;
      default:
        newBoardState = {
          nLines: 10,
          nColumns: 20,
          nMines: 70,
        };
        break;
    }
    setBoardState(newBoardState);
  };

  const handleLevelChange = (event) => {
    const selectedLevel = parseInt(event.target.value);
    setLevel(selectedLevel);
    changeLevel(selectedLevel);
  };

  const handleGameEnd = (won) => {
    setGameOver(true);
    setGameWon(won);
    setModalOpen(true);
    playGameOver(won)
  };

  const playGameOver = (won) => {
    if (!soundMuted) {
      const audioGameOver = new Audio(won ? cheer : explosao);
      audioGameOver.play()
    }
  }

  const handleSoundMute = () => {
    setSoundMuted(!soundMuted)
  }

  return (
    <div className="App">
      <GameOver isOpen={modalOpen} onClose={() => setModalOpen(false)} message={gameWon ? 'YOU WIN!' : 'YOU LOST!'} isWin={gameWon} />
      <Header boardState={boardState} totalFlags={totalFlags} gameStarted={gameStarted} gameOver={gameOver} changeLevel={handleLevelChange} soundMuted={soundMuted} handleSoundMute={handleSoundMute} />
      <Board boardState={boardState} board={board} handleCellClick={handleCellClick} placeFlag={placeFlag} gameOver={gameOver} gameWon={gameWon} soundMuted={soundMuted}/>
      <Reset resetBoard={resetBoard} />
    </div>
  );
}

export default App;
