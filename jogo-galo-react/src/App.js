import React, { useState, useEffect } from 'react';
import './App.css';
import { Board } from './Components/Board/Board';
import { ResetBoard } from './Components/Board/ResetBoard';
import { Header } from './Components/Header';
import { GameOver } from './Components/Alertas/GameOver';
import { RandomizeFirstPlayer, DisplayName, Menu } from './Components/Alertas/Menu';
import { Bot } from './Components/Bot/Bot';

function App() {
  const [board] = useState(Array(9).fill(null));
  const [boards, setBoards] = useState(Array(9).fill(board));
  const [turn, setTurn] = useState(true);
  const [startGame, setStartGame] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [empate, setEmpate] = useState(false);
  const [boardWin, setBoardWin] = useState(Array(9).fill(null));
  const [lastMove, setLastMove] = useState(Array(9).fill(true));
  const [gameMode, setGameMode] = useState(null);

  const handleStartGame = (value) => {
    setStartGame(value);
  };
  const handleGameOver = (value) => {
    setGameOver(value);
  };

  const handleGameMode = (value) => {
    setGameMode(value);
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
    let ocupied = true;
    const updatedBoards = boards.map((board, ind) => {
      if (ind === boardInd) {
        return board.map((token, i) => {
          if (i === boxInd && token == null) {
            setTurn(!turn);
            return turn ? 'X' : 'O';
          } else if (i === boxInd) {
            ocupied = false;
            return token;
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
    if (ocupied) {
      boardWin[boxInd] === null ?
        lastMove.forEach((element, index) => {
          lastMove[index] = index === boxInd ? true : false
        }) : setLastMove(Array(9).fill(true));
    }
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
        let currentPlayerWins = 0, otherPlayerwins = 0, empates = 0;
        for (let i = 0; i < boardWin.length; i++) {
          const element = boardWin[i];
          if (element === "win" + token) currentPlayerWins++;
          else if (element === "empate") empates++;
          else otherPlayerwins++
        }
        if (currentPlayerWins < otherPlayerwins) {
          setTurn(!turn);
        } else if (currentPlayerWins === otherPlayerwins) setEmpate(true);
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
    setEmpate(false);
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
        playerTwoName={playerTwoName} setPlayerTwoName={setPlayerTwoName} 
        gameMode={gameMode} setGameMode={handleGameMode}
        />
      {startGame && (
        <>
          <Bot turn={turn} lastMove={lastMove} boardWin={boardWin} boxClick={boxClick}/>
          <RandomizeFirstPlayer playerOneName={playerOneName} setPlayerOneName={setPlayerOneName}
            playerTwoName={playerTwoName} setPlayerTwoName={setPlayerTwoName} />
          <DisplayName playerName={playerOneName} token={"X"} turn={turn} gameOver={gameOver} handleGameOver={handleGameOver} />
          <DisplayName playerName={playerTwoName} token={"O"} turn={!turn} gameOver={gameOver} handleGameOver={handleGameOver} />
          <GameOver nome={turn ? playerTwoName : playerOneName} jogador={turn ? 'O' : 'X'} display={gameOver} resetBoard={resetBoard} empate={empate} />
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