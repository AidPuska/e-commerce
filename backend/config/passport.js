const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcrypt')

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user)
    })
})

passport.use(
    new LocalStrategy(
        (username, password, done) => {
            console.log('password', password)
            User.findOne({ username: username })
                .then((currentUser) => {
                    if (currentUser) {
                        const pass = bcrypt.compareSync(password, currentUser.password)
                        console.log('check passport', pass)
                        if (pass) {
                            return done(null, currentUser)
                        } else {
                            done(null, false)
                        }
                    } else {
                        const hashed = bcrypt.hashSync(password, 10)
                        new User({
                            username: username,
                            password: hashed,
                            picture: 'https://www.w3schools.com/w3images/avatar2.png'
                        }).save().then((newUser) => {
                            console.log('New user created with local', newUser);
                            done(null, newUser)
                        })
                    }
                })
        }
    )
)

passport.use(
    new GoogleStrategy({
        // options for the google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/api/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // check if user exists in user database
        User.findOne({ googleId: profile.id })
            .then((currentUser) => {
                if (currentUser) {
                    // already have a user
                    done(null, currentUser)
                } else {
                    // no user, then create one
                    new User({
                        username: profile.displayName,
                        googleId: profile.id,
                        picture: profile._json.picture
                    }).save().then((newUser) => {
                        console.log('New account created: ', newUser)
                        done(null, newUser)
                    })
                }
            })
    })
)