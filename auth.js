let express = require('express');
let passport = require('passport');
let users = require('./data/users.json');
let _ = require('lodash');

let router = express.Router();
module.exports = router;

router.get('/login', function (req, res, next) {
    if(req.app.get('env') === 'development') {
        let user;
        if (req.query.user) {
            user = _.find(users, u => u.name === req.query.user);
        } else {
            user = users[0];
        }
        req.login(user.id, function (err) {
            if (err) {
                return next(err);
            }
            return res.redirect('/');
        });
        return;
    }
    return res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/login');
});