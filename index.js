const express = require('express');
const app = express();

app.get("/", (req, res) => {
    res.send('s');
})

app.listen(8000, () => {
    console.log('listening now!');
})