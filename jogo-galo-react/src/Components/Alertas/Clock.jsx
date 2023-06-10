import React, { useState, useEffect } from "react";

export const Clock = ({ turn, gameOver, handleGameOver }) => {
    const [timer, setTimer] = useState(300);

    useEffect(() => {
        let interval = null;

        if (turn) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }

        if (!timer) handleGameOver(true);

        if (gameOver || !turn) clearInterval(interval);

        return () => clearInterval(interval);
    }, [turn, timer, gameOver, handleGameOver]);

    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    return <h2>{minutes ? `${minutes}m:${seconds}s` : seconds + "s"}</h2>;
};
