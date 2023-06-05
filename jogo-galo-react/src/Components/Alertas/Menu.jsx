import React, { useState, useEffect } from "react";
import "./Menu.css";

export const Menu = (props) => {
    const [gameMode, setGameMode] = useState(null);
    const [startGame, setStartGame] = useState(props.startGame);
    const [playerOne, setPlayerOneName] = useState(props.playerOneName);
    const [playerTwo, setPlayerTwoName] = useState(props.playerTwoName);

    useEffect(() => {
        setStartGame(props.startGame);
        setPlayerOneName(props.playerOneName);
        setPlayerTwoName(props.playerTwoName);
    }, [props.startGame, props.playerOneName, props.playerTwoName]);

    const InputNames = () => {
        const [playerOneName, setPlayerOneName] = useState(playerOne);
        const [playerTwoName, setPlayerTwoName] = useState(playerTwo);
        useEffect(() => {
            setPlayerOneName(playerOne);
            setPlayerTwoName(playerTwo);
        }, [playerOne, playerTwo]);

        const [invalidNames, setInvalidNames] = useState(false);

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

        function verify(playerOneName, playerTwoName) {
            if (playerOneName === playerTwoName || playerOneName === "" || playerTwoName === "") {
                setInvalidNames(true);
                setTimeout(() => {
                    setInvalidNames(false);
                }, 3000);
            } else {
                props.setStartGame(true);
                props.setPlayerOneName(playerOneName);
                props.setPlayerTwoName(playerTwoName);
            }
        }

        if (gameMode === 1) {
            return (
                <form className={startGame ? "hidden" : "playersMenu"} onSubmit={handleSubmit}>
                    <button className="startgame" type="submit">
                        Start Game
                    </button>
                    <button className="startgame back" onClick={() => setGameMode(0)}>
                        Back
                    </button>
                </form>
            );
        } else if (gameMode === 2) {
            return (
                <form className={startGame ? "hidden" : "playersMenu"} onSubmit={handleSubmit}>
                    <h1 className="names">Escolha o seu Nome</h1>
                    <div className="players">
                        <label>
                            Jogador 1
                            <input
                                className="label"
                                placeholder="Digite o seu nome"
                                type="text"
                                value={playerOneName}
                                onChange={handlePlayerOneChange}
                            />
                        </label>
                        <br />
                        <label>
                            Jogador 2
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
                    <button className="startgame back" onClick={() => setGameMode(0)}>
                        Back
                    </button>
                    <span className={invalidNames ? "invalidNames" : "hidden"}>Nomes Introduzidos Invalidos</span>
                </form>
            );
        }
    };

    const GameMode = () => {
        if (!gameMode) {
            return (
                <div className="gameMode">
                    <button onClick={() => setGameMode(1)}>1 Jogador</button>
                    <button onClick={() => setGameMode(2)}>2 Jogadores</button>
                </div>
            );
        }
    };
    if (!startGame) {
        return (
            <div className="mainMenu">
                <GameMode />
                <InputNames playerOneName={playerOne} playerTwoName={playerTwo} />
            </div>
        );
    }
};
export const DisplayName = (props) => {
    return (
        <div className={"player " + props.token} style={props.turn ? { opacity: 1 } : { opacity: 0.4 }}>
            <h2>{props.playerName}</h2>
            <p>{props.token}</p>
        </div>
    );
};
export const RandomizeFirstPlayer = React.memo((names) => {
    const [players, setPlayers] = useState([names.playerOneName, names.playerTwoName]);
    const randomIndex = Math.floor(Math.random() * 2);
    names.setPlayerOneName(players[randomIndex]);
    names.setPlayerTwoName(players[randomIndex === 0 ? 1 : 0]);

    const [hidden, setHidden] = useState(false);
    const handleClick = () => {
        setHidden(true);
    };

    return (
        <div className={hidden ? "hidden" : ""} onClick={handleClick}>
            <div className={`firstPlayer`} onClick={handleClick}>
                <h1>{players[randomIndex] + " Joga Primeiro!"}</h1>
            </div>
        </div>
    );
});
