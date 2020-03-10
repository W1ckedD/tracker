const express = require('express');


// App
const app = express();

app.get('/', (req, res, next) => {
    res.send('Hello World');
});


// Port
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));