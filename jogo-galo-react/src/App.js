import React, { useState, useEffect } from 'react';
import './App.css';
import { Board } from './Components/Board/Board';
import { ResetBoard } from './Components/Board/ResetBoard';
import { Header } from './Components/Header';
import { GameOver } from './Components/Alertas/GameOver';
import { RandomizeFirstPlayer, DisplayName, Menu } from './Components/Alertas/Menu';

function App() {
  const [board] = useState(Array(9).fill(null));
  const [boards, setBoards] = useState(Array(9).fill(board));
  const [turn, setTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [boardWin, setBoardWin] = useState(Array(9).fill(null));
  const [lastMove, setLastMove] = useState(Array(9).fill(true));
  const [startGame, setStartGame] = useState(false);
  const handleStartGame = (value) => {
    setStartGame(value);
  };
  const [playerOneName, setPlayerOneName] = useState("");
  const [playerTwoName, setPlayerTwoName] = useState("");
  const handlePlayerOne = (name) => {
    setPlayerOneName(name.playerOneName);
  };
  const handlePlayerTwo = (name) => {
    setPlayerTwoName(name.playerTwoName);
  };

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
    checkWin(updatedBoards[boardInd], turn ? 'X' : 'O', boardInd);
    boardWin[boxInd] === null ?
      lastMove.forEach((element, index) => {
        lastMove[index] = index === boxInd ? true : false
      }) : setLastMove(Array(9).fill(true));
  };

  const checkWin = (board, token, boardInd) => {
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [6, 4, 2] // Diagonals
    ];

    for (const condition of winConditions) {
      const [a, b, c] = condition;
      if (board[a] === token && board[b] === token && board[c] === token) {
        if (board === boardWin) {
          console.log("GANHOU O JOGADOR " + token);
          setLastMove(Array(9).fill(true));
          setGameOver(true);
        } else {
          console.log(token + " Ganhou o tabuleiro " + boardInd);
          boardWin[boardInd] = "win" + token;
          board.fill(null);
          checkWin(boardWin, "win" + token);
        }
        return;
      }
    }

    if (!board.includes(null)) {
      if (board === boardWin) {
        setGameOver(true);
      } else {
        boardWin[boardInd] = "empate";
        board.fill(null);
        checkWin(boardWin);
      }
    }
  };

  const resetBoard = () => {
    setGameOver(false);
    setStartGame(false);
    setBoardWin(Array(9).fill(null));
    setBoards(Array(9).fill(Array(9).fill(null)));
    setLastMove(Array(9).fill(true));
    setTurn(true);
  };

  const autoWin = () => {
    setGameOver(true);
    console.log(`Ganhou o jogador ${turn ? "X" : "O"}`);
    console.log("GameOver - " + gameOver);
  }

  return (
    <div className="App">
      <Header />
      <Menu startGame={startGame} setStartGame={handleStartGame}
        playerOneName={playerOneName} setPlayerOneName={setPlayerOneName}
        playerTwoName={playerTwoName} setPlayerTwoName={setPlayerTwoName} />
      {startGame && (
        <>
          <RandomizeFirstPlayer playerOneName={playerOneName} setPlayerOneName={setPlayerOneName}
            playerTwoName={playerTwoName} setPlayerTwoName={setPlayerTwoName} />
          <DisplayName playerName={playerOneName} token={"X"} turn={turn} />
          <DisplayName playerName={playerTwoName} token={"O"} turn={!turn} />
          <GameOver nome={turn ? playerTwoName : playerOneName} jogador={turn ? 'O' : 'X'} display={gameOver} resetBoard={resetBoard} />
          <div className={gameOver ? 'mainBoard win' : 'mainBoard'}>
            {boards.map((value, boardInd) => (
              <Board
                key={boardInd}
                board={boards[boardInd]}
                win={boardWin[boardInd]}
                lastMove={lastMove[boardInd]}
                onClick={gameOver ? resetBoard : (boxInd) => boxClick(boardInd, boxInd)}
              />
            ))}
          </div>
          <ResetBoard resetBoard={resetBoard} />
          <button className="reset-btn" onClick={autoWin}>AUTO WIN</button>
        </>
      )}
    </div>
  );
}

export default App;