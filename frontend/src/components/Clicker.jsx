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
        } 
        catch (error) {
            console.error(error);
        }
    };

    const styles = {
        gameContainer: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: '#f3f4f6',
          padding: '1rem'
        },
        gameContent: {
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem'
        },
        gameTitle: {
          fontSize: '2.25rem',
          fontWeight: 'bold',
          color: '#1f2937'
        },
        gameStats: {
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        },
        score: {
          fontSize: '1.5rem',
          fontWeight: '600'
        },
        prizes: {
          fontSize: '1.25rem'
        },
        clickButton: {
          backgroundColor: '#3b82f6',
          color: 'white',
          fontWeight: 'bold',
          padding: '1rem 2rem',
          borderRadius: '0.5rem',
          fontSize: '1.25rem',
          transition: 'background-color 0.3s',
          cursor: 'pointer'
        },
        clickButtonHover: {
          backgroundColor: '#2563eb'
        },
        gameMessage: {
          marginTop: '1rem'
        }
    };

    return (
        <div style={styles.gameContainer}>
        <div style={styles.gameContent}>
        <h1 style={styles.gameTitle}>Click Counter Game</h1>
        
        <div style={styles.gameStats}>
          <div style={styles.score}>
            Score: {totalScore}
          </div>
          <div style={styles.prizes}>
            Prizes Won: {prizesWon}
          </div>
          
          <button
            onClick={handleClick}
            style={styles.clickButton}
            onMouseEnter={(e) => e.target.style.backgroundColor = styles.clickButtonHover.backgroundColor}
            onMouseLeave={(e) => e.target.style.backgroundColor = styles.clickButton.backgroundColor}
          >
            Click Me!
          </button>
        </div>
        {message && <p style={styles.gameMessage}>{message}</p>}
      </div>
    </div>
    );
};

export default Clicker;