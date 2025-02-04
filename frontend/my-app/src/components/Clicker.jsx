import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Clicker = ({ userId }) => {
    const [totalScore, setTotalScore] = useState(0);
    const [prizesWon, setPrizesWon] = useState(0);
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:5000/api/user/${userId}`)
            .then((response) => {
                setTotalScore(response.data.totalScore);
                setPrizesWon(response.data.prizesWon);
            })
            .catch((error) => console.error(error));
    }, [userId]);

    const handleClick = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/api/click/${userId}`);
            setTotalScore(response.data.totalScore);
            setPrizesWon(response.data.prizesWon);

            if (response.data.prizeWon) {
                setMessage('You won a prize!');
            } else if (response.data.totalScore > 1) {
                setMessage(`You earned ${response.data.totalScore} points!`);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="text-center space-y-8">
        <h1 className="text-4xl font-bold text-gray-800">Click Counter Game</h1>
        
        <div className="space-y-4">
            <div className="text-2xl font-semibold">
            Score: {totalScore}
            </div>
            <div className="text-xl">
            Prizes Won: {prizesWon}
            </div>
            
            <button
            onClick={handleClick}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors"
            >
            Click Me!
            </button>
        </div>
        {message && <p>{message}</p>}
        </div>
        </div>
    );
};

export default Clicker;