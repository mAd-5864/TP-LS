import React, { useState, useEffect } from "react";
import { ResetBoard } from "../Board/ResetBoard";
import "./GameOver.css";

export const GameOver = (props) => {
    const [display, setDisplay] = useState(props.display);

    useEffect(() => {
        setDisplay(props.display);
    }, [props.display]);

    const hide = () => {
        setDisplay(false);
    };
    return (
        <div className={display ? `winnerModal` : "disabled"}>
            <div className={`modalContent  ` + (!props.empate ? props.jogador : "empate")}>
                <h1 className="endgame">Game Over</h1>

                <h2 className="pwin">{props.empate ? "Empate" : props.nome + " Ganhou"}!</h2>
                <span>
                    <button className="reset-btn" onClick={hide}>
                        Ver Tabuleiro
                    </button>
                    <ResetBoard resetBoard={props.resetBoard} />
                </span>
            </div>
        </div>
    );
};
