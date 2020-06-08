require('dotenv').config();
const express = require('express');

const router = require('./routes');
const db = require('./dataBase').getInstance();
db.setModels();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(router);
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 400)
        .json({
            message: err.message,
            code: err.customCode
        })
})


app.listen(process.env.PORT || 3000, (err) => {
    if (err) console.log(err);
    console.log(`Server is running on port ${process.env.PORT || 3000}...`)
})