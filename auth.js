let express = require("express");

let router = express.Router();
module.exports = router;

router.get('/login', function (req, res) {
    res.render('login', {});
});

router.get('/logout', function (req, res) {

});

