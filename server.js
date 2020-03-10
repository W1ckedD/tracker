const express = require('express');
const connectDB = require('./config/db');

// App 
const app = express();

// Database
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/auth', require('./routes/auth'));

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
