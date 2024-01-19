// const express = require('express');
import express from 'express';

const app = express(); // init express router

app.get('/dev', (req, res) => {
    res.json('testing hit the /dev route!');
});

app.listen(4040, () =>
{
    console.log(`server is listening on 4040`);
});
