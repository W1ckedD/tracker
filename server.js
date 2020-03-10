const express = require('express');
const connectDB = require('./config/db');

// App
const app = express();

// Database
connectDB();

// Middlewares
app.get('/', (req, res, next) => {
    res.send('Hello World');
});

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
