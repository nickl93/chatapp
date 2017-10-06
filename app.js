var express = require("express");
var rooms = require("./data/rooms.json");
var uuid = require("node-uuid");
var bodyParser = require("body-parser");
var _ = require("lodash");

var app = express();

app.set("views", "views");
app.set("view engine", "jade");

app.use(express.static("public"));
app.use(express.static("node_modules/jquery/dist"));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(express.static("node_modules/popper.js/dist"));
app.use(express.static("node_modules/font-awesome"));
app.use((bodyParser.urlencoded({ extended: true})));

app.get('/', function (req, res) {
    res.render("index", { title: "Home"});
});

app.get('/admin/rooms', function (req, res) {
    res.render("rooms", { title: "Rooms",
                          rooms: rooms});
});

app.get('/admin/rooms/add', function (req, res) {
    res.render("add");
});

app.post('/admin/rooms/add', function (req, res) {
    console.log(req);
    var room = {
        name: req.body.name,
        id: uuid.v4()
    };
    console.log(room);
    rooms.push(room);
    res.redirect('/admin/rooms');
});

app.get('/admin/rooms/delete/:id', function (req, res) {
    let roomId = req.params.id;
    rooms = rooms.filter(r => r.id !== roomId);
    res.redirect("/admin/rooms");
});

app.get('/admin/rooms/edit/:id', function (req, res) {
    let roomId = req.params.id;
    let room = _.find(rooms, r => r.id === roomId);

    res.render("edit", {room: room});
});

app.get('/admin/users', function (req, res) {
    res.render("users", { title: "Users"});
});

app.listen(3001, function () {
    console.log("Chat app listening on port 3001");
});