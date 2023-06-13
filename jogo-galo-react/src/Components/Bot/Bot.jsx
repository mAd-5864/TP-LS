import React, { useEffect } from "react";

export const Bot = (props) => {
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
          boxindex = Math.floor(Math.random() * 9);

        } while (props.boards[boardindex][boxindex] != null);
        props.boxClick(boardindex, boxindex);
        console.log("BOT JOGOU Board: " + boardindex + " Box: " + boxindex);
      }
    }, 1000);

  }, [props.turn]); 
};
