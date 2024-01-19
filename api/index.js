const express = require('express');

const app = express(); // init express router

app.get('/dev', (req, res) => {
    res.json('testing hit the /dev route!');
});

app.listen(4000);
