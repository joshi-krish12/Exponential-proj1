const User = require('../models/User');

const getUserData = async (userId) => {
    const user = await User.findOne({ userId });

    if (!user) {
        const newUser = new User({ userId });
        await newUser.save();
        return newUser;
    }

    return user;
};

module.exports = getUserData;