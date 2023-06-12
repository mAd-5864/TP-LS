import React, { useState, useEffect } from "react";

export const Bot = (props) => {
  let boardindex;
  let boxindex;
    if (!props.turn) {
      if(props.lastMove.includes(false)){
        boardindex=props.lastMove.indexOf(true)
      }else{
        let availableBoards = [];
        for (let i = 0; i < props.boardWin.length; i++) {
          if (props.boardWin[i] === null) {
            availableBoards.push(i);
          }          
        }
        boardindex = availableBoards[Math.floor(Math.random() * availableBoards.length)];
      }
      boardindex = Math.floor(Math.random() * 9);
      props.boxClick(boardindex,boxindex);
    }
  };