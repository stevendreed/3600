const express = require('express');
const mongoose = require('mongoose');
// import express from 'express';
require('dotenv').config();

// for testing purposes
// console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL);

const mongoUrl = process.env.MONGO_URL;

const app = express(); // init express router

app.get('/dev', (req, res) => {
    res.json('testing hit the /dev route!');
});

// REGISTER route: route for NEW users
app.post('register', (req, res) =>
{

})

app.listen(4040, () =>
{
    console.log(`server is listening on 4040`);
});
