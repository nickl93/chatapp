let express = require("express");
let rooms = require("./data/rooms.json");
let messages = require("./data/messages.json");
let _ = require("lodash");

let router = express.Router();
module.exports = router;

router.get("/rooms", function (req, res) {
    res.json(rooms);
});

router.get("/rooms/:id/messages", function (req, res) {
    let roomId = req.params.id;
    let room = _.find(rooms, r => r.id === roomId);
    let roomMessages = messages.filter(m => m.roomId === roomId);
    if (!room) {
        res.sendStatus(404);
        return;
    }
    res.json({
        room: room,
        messages: roomMessages
    });
});