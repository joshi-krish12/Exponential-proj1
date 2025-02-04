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
        <div>
            <h1>Cookie Clicker</h1>
            <p>Total Score: {totalScore}</p>
            <p>Prizes Won: {prizesWon}</p>
            <button onClick={handleClick}>Click Me!</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Clicker;