import React, { useEffect } from "react";

export const Bot = (props) => {
  const BotBlock = (board) => {
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [6, 4, 2] // Diagonals
    ];
    console.log(board);
    let token
    for (let i = 0; i < 2; i++) {
      i ? token = 'X' : token = 'O'
      for (const condition of winConditions) {
        const [a, b, c] = condition;
        console.log("A" + a);
        console.log("B" + b);
        console.log("C" + c);
        if (board[a] === token && board[b] === token && board[c] === null) {
          return c
        } else
          if (board[a] === token && board[c] === token && board[b] === null) {
            return b
          } else
            if (board[c] === token && board[b] === token && board[a] === null) {
              return a
            }
      }
    }
    return null;
  };

  useEffect(() => {
    setTimeout(() => {
      if (!props.turn && !props.gameOver) {
        let boardindex;
        let boxindex;
        do {
          if (props.lastMove.includes(false)) {
            boardindex = props.lastMove.indexOf(true);
          } else {
            let availableBoards = [];
            for (let i = 0; i < props.boardWin.length; i++) {
              if (props.boardWin[i] === null) {
                availableBoards.push(i);
              }
            }
            boardindex = availableBoards[Math.floor(Math.random() * availableBoards.length)];
          }
          console.log(props.boards[boardindex]);
          boxindex = BotBlock(props.boards[boardindex])
          console.log("Tentou: " + boxindex);
          if (boxindex === null) {
            boxindex = Math.floor(Math.random() * 9);
          }

        } while (props.boards[boardindex][boxindex] != null);
        props.boxClick(boardindex, boxindex);
        console.log("BOT JOGOU Board: " + boardindex + " Box: " + boxindex);
      }
    }, 1000);

  }, [props.turn]);
};