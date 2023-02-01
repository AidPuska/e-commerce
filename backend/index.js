const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const session = require('express-session')
const keys = require('./config/keys')
const MongoStore = require('connect-mongo')

const passport = require('passport')
const passportSetup = require('./config/passport')

const authRoute = require('./routes/auth')
require('dotenv').config()

const productRoute = require('./routes/Product')
const cartRoute = require('./routes/cart')

const port = process.env.PORT;

// connect to mongodb
mongoose.connect(process.env.MONGO)
    .then(res => {
        console.log('Connected to database')
    }).catch(err => {
        console.log(err)
    })

const store = MongoStore.create({
    mongoUrl: process.env.MONGO,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: keys.session.cookieKey
    }
})

store.on('error', function (e) {
    console.log('SESSION STORE ERROR', e)
});

app.use(session({
    store,
    name: '_isd',
    secret: keys.session.cookieKey,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        //secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}))

// initialize passport
app.use(passport.initialize())
app.use(passport.session())

// use json
app.use(express.json())

app.use(cors({
    origin: ['https://accounts.google.com', 'http://localhost:5173'],
    credentials: true,
}))


// use routes
app.use('/api', productRoute)

app.use('/api/auth', authRoute)

app.use('/api/cart', cartRoute)


//listen app 
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})