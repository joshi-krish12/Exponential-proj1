const User = require('../models/User');

const handleClick = async (userId) => {
    const user = await User.findOne({ userId });

    if (!user) {
        throw new Error('User not found');
    }
    let scoreIncrement = 1;
    if (Math.random() < 0.5) {
        scoreIncrement = 10;
    }
    let prizeWon = false;
    if (Math.random() < 0.25) {
        user.prizesWon += 1;
        prizeWon = true;
    }
    user.totalScore += scoreIncrement;
    await user.save();
    return {
        totalScore: user.totalScore,
        prizeWon,
        prizesWon: user.prizesWon,
    };
};

module.exports = handleClick;