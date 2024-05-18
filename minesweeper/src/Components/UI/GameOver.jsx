import React from 'react';
import './GameOver.css';

const GameOver = ({ isOpen, onClose, message, isWin }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content" onClick={onClose}>
                <h1 className={isWin ? 'win' : 'lose'}>{message}</h1>
            </div>
        </div>
    );
};

export default GameOver;
