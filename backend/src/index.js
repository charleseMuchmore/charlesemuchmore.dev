const express = require('express');
const cors = require('cors');
const { app_port, app_protocol, app_host } = require('./config');
const dotenv = require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: [
        'http://localhost:3002',
        'https://charlese.website',
        'https://www.charlese.website'
    ]
}));

// Route Groups
app.use('/admin', require('./routes/admin'));
app.use('/auth', require('./routes/auth'));
app.use('/contact', require('./routes/contact'));
app.use('/entries', require('./routes/entries'));
app.use('/experiences', require('./routes/experiences'));
app.use('/joys', require('./routes/joys'));
app.use('/projects', require('./routes/projects'));
app.use('/tags', require('./routes/tags'));
app.use('/users', require('./routes/users'));
app.use('/api/apps', require('./routes/apps'));
app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
});

app.listen(app_port, () => {
    console.log(`Server is running on port ${app_port}`);
});