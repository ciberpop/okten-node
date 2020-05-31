const express = require('express');
const router = require('./routes')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(router);

app.listen(3000, (err) => {
    if (err) console.log(err);
    console.log('Server is running on port 3000...')
})