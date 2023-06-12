import React, { useState, useEffect } from "react";

export const makeBotMove = () => {
    const availableMoves = board.reduce((acc, value, index) => {
      if (value === '') {
        acc.push(index);
      }
      return acc;
    }, []);

    if (availableMoves.length === 0) {
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    const botMove = availableMoves[randomIndex];
    makeMove(botMove);
  };