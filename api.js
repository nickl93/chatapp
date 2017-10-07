let express = require("express");
let rooms = require("./data/rooms.json");
let messages = require("./data/messages.json");
let uuid = require("node-uuid");
let _ = require("lodash");

let router = express.Router();
module.exports = router;

router.get("/rooms", function (req, res) {
    res.json(rooms);
});

router.route("/rooms/:id/messages")
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
        let roomMessages = messages.filter(m => m.roomId === res.locals.room.id);
        res.json({
            room: res.locals.room,
            messages: roomMessages
        });
    })
    .post(function (req, res) {
        let message = {
            roomId: res.locals.room.id,
            text: req.body.text,
            userId: "44f885e8-87e9-4911-973c-4074188f408a",
            id: uuid.v4()
        };
        messages.push(message);
        res.sendStatus(200);
    });
