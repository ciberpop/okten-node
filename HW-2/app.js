const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');
const fs = require('fs');
const User = require('./models/User');

const app = express();


app.engine('hbs', expressHbs({
    layoutsDir: 'views/layouts/',
    defaultLayout: 'main-layout',
    extname: 'hbs'
}));

app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', (req, res) => {
    const  {email, password} = req.body;
    const user = new User(email, password);
    const answer = user.save();
    if (answer) {
        res.redirect('users')
    } else {
        res.render('index', {errMessReg: 'Sorry, you are already registered'})
    }
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', (req, res) => {
    const  {email, password} = req.body;
    const user = User.findUser(email, password)
    if (user) {
        res.redirect('users')
    } else {
        res.render('index', {errorMessage: 'Sorry, invalid email or you are not registered!'})
    }
})

app.get('/users', (req, res) => {
    const users = User.getAll()
    res.render('users', {users})
})

app.use((req, res) => res.status(404).render('404'));

app.listen(3000, err => {
    if (err) console.log(err)
    console.log('Server is running on port 3000...')
})