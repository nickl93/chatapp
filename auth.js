let express = require("express");
let passport = require("passport");

let router = express.Router();
module.exports = router;

router.route('/login')
    .get(function (req, res) {
        res.render('login', {});
    })
    .post(function (req, res) {
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login'
        })
    });

router.get('/logout', function (req, res) {

});

