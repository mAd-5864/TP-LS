import { React } from "react";
import './GameOver.css';

export const GameOver = (props) => {
    return (
        <div className={props.gameOver ? "popup" : "disabled"}>
            <h1 className="endgame"><span>Game</span> Over</h1>
            <h2 className="pwin">Ganhou o jogador { props.nome } </h2>        
        </div>
    )
}