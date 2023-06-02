import React, { useState, useEffect } from "react";
import "./Players.css";

export const GameForm = (props) => {
  const [playerOneName, setPlayerOneName] = useState("");
  const [playerTwoName, setPlayerTwoName] = useState("");
  const [startGame, setStartGame] = useState(props.startGame);

  useEffect(() => {
    setStartGame(props.startGame);
  }, [props.startGame]);

  const handlePlayerOneChange = (event) => {
    setPlayerOneName(event.target.value);
  };

  const handlePlayerTwoChange = (event) => {
    setPlayerTwoName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    verify(playerOneName, playerTwoName);
  };

  function verify (playerOneName, playerTwoName) {
    if (playerOneName === playerTwoName){
      alert("Os nomes devem ser diferentes");
    }else{
      setStartGame(true);
    }
  }

  return (
    <form className={startGame ? "hidden" : "tudo"} onSubmit={handleSubmit}>
      <h1 className="names">Escolha o seu Nome</h1>
      <div className="players">
        <label className="player">
          Player One:
          <input
            className="label"
            placeholder="Digite o seu nome"
            type="text"
            value={playerOneName}
            onChange={handlePlayerOneChange}
          />
        </label>
        <br />
        <label className="player">
          Player Two:
          <input
            className="label"
            placeholder="Digite o seu nome"
            type="text"
            value={playerTwoName}
            onChange={handlePlayerTwoChange}
          />
        </label>
        <br />
      </div>
      <button className="startgame" type="submit">
        Start Game
      </button>
    </form>
  );
};
