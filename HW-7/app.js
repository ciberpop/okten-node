require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const {PORT} = require('./config');
const router = require('./routes');
const db = require('./dataBase').getInstance();
db.setModels();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(morgan('dev'));

app.use(router);
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 400)
        .json({
            message: err.message,
            code: err.customCode
        })
})


app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log(`Server is running on port ${PORT}...`)
})