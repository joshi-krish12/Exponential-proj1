const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const handleClick = require('./jobs/hadleClick');
const getUserData = require('./jobs/getUserData');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/cookieClicker', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.get('/api/user/:userId', async (req, res) => {
    try {
        const user = await getUserData(req.params.userId);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/click/:userId', async (req, res) => {
    try {
        const result = await handleClick(req.params.userId);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});