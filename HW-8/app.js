require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const path = require('path');

const {configs: {PORT}} = require('./config');
const {cronRun} = require('./cron');
const {logger} = require('./config');
const router = require('./routes');
const db = require('./dataBase').getInstance();
db.setModels();

const app = express();

app.use(fileUpload({}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

cronRun();

app.use(router);

app.use('*', (err, req, res, next) => {
    logger.error({
        method: req.method,
        url: req.path,
        data: req.body,
        time: new Date(),
        message: err.message
    })

    next(err);
});

app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 400)
        .json({
            message: err.message,
            code: err.customCode
        })
});


app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log(`Server is running on port ${PORT}...`)
});
