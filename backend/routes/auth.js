const router = require('express').Router();
const passport = require('passport');

router.get('/login/success', (req, res) => {
    if (req.user) {
        res.status(200).json({ user: req.user })
    } else {
        res.status(403).json({ error: 'Not authorized' })
    }
})

router.post('/login', passport.authenticate('local', {
    successRedirect: 'http://localhost:5173'
}))

router.get('/google', passport.authenticate('google', {
    scope: ['profile'],
    keepSessionInfo: true
}))

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('http://localhost:5173/')
})

router.get('/logout', (req, res, next) => {
    req.logout(err => {
        if (err) return next(err);
        res.redirect('http://localhost:5173/signup')
    })
});

module.exports = router;