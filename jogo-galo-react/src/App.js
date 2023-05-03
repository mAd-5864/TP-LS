import React, { useState } from 'react';
import './App.css';
import { Board } from './Components/Board';
import { ResetBoard } from './Components/ResetBoard';
import { Header } from './Components/Header';

function App() {
  const [board] = useState(Array(9).fill(null));
  const [boards, setBoards] = useState(Array(9).fill(board));
  const [turn, setTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [boardWin, setBoardWin] = useState(Array(9).fill(false));

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
    //console.log(updatedBoards);
  }

  const checkWin = (board, token, boardInd) => {
    if (board[0] == token && board[1] == token && board[2] == token || board[3] == token && board[4] == token && board[5] == token || board[6] == token && board[7] == token && board[8] == token ||
      board[0] == token && board[3] == token && board[6] == token || board[1] == token && board[4] == token && board[7] == token || board[2] == token && board[5] == token && board[8] == token ||
      board[0] == token && board[4] == token && board[8] == token || board[6] == token && board[4] == token && board[2] == token) {
        if (board==boardWin) {
          console.log("GANHOU O JOGADOR "+ token);
          setGameOver(true);
        }else{

          console.log(token + " Ganhou o tabuleiro " + boardInd);
          boardWin[boardInd]="win"+token;
          board.fill(null);
          checkWin(boardWin, "win"+token);
        }
          console.log(boardWin);
    } else {
    }
  }



  const resetBoard = () => {
    setGameOver(false);
    setBoardWin(Array(9).fill(false));
    setBoards(Array(9).fill(Array(9).fill(null)));
    setTurn(true);
  }

  return (
    <div className="App">
      <Header />;
      <div className={gameOver ? 'mainBoard win' : 'mainBoard'}>
        {boards.map((value, boardInd) => (
          <Board
            key={boardInd}
            board={boards[boardInd]}
            win={boardWin[boardInd]}
            onClick={gameOver ? resetBoard : (boxInd) => boxClick(boardInd, boxInd)}
          />
        ))}
      </div>
      <ResetBoard resetBoard={resetBoard} />
    </div>
  );
}

export default App;
