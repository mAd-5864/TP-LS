import React, { useState, useEffect } from "react";

export const Clock = ({ gameOver, gameStarted }) => {
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        let interval = null;

        interval = setInterval(() => {
            setTimer((prevTimer) => prevTimer + 1);
        }, 1000);


        if (!gameStarted || gameOver) clearInterval(interval);

        return () => clearInterval(interval);
    }, [timer, gameOver, gameStarted]);

    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    return <h3>🕒: {minutes ? `${minutes}m:${seconds}s` : seconds + "s"}</h3>;
};
