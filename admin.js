let express = require("express");
let uuid = require("node-uuid");
let _ = require("lodash");
let rooms = require("./data/rooms.json");

let router = express.Router();
module.exports = router;

router.use(function (req, res, next) {
    if (req.user.admin) {
        next();
        return;
    }
    res.redirect("/login");
});

router.get('/rooms', function (req, res) {
    res.render("rooms", {
        title: "Rooms",
        rooms: rooms
    });
});

router.route('/rooms/add')
    .get(function (req, res) {
        res.render("add");
    })
    .post(function (req, res) {
        console.log(req);
        let room = {
            name: req.body.name,
            id: uuid.v4()
        };
        console.log(room);
        rooms.push(room);
        res.redirect(req.baseUrl + '/rooms');
    });

router.get('/rooms/delete/:id', function (req, res) {
    let roomId = req.params.id;
    rooms = rooms.filter(r => r.id !== roomId);
    res.redirect(req.baseUrl + "/rooms");
});

router.route('/rooms/edit/:id')
    .all(function (req, res, next) {
        let roomId = req.params.id;
        let room = _.find(rooms, r => r.id === roomId);
        if (!room) {
            res.sendStatus(404);
            return;
        }
        res.locals.room = room;
        next();
    })
    .get(function (req, res) {
        res.render("edit");
    })
    .post(function (req, res) {
        res.locals.room.name = req.body.name;
        res.redirect(req.baseUrl + "/rooms");
    });

router.get('/users', function (req, res) {
    res.render("users", {title: "Users"});
});