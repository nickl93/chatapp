var express = require("express");
var app = express();
var rooms = require("./data/rooms.json");


app.set("views", "views");
app.set("view engine", "jade");

app.use(express.static("public"));
app.use(express.static("node_modules/jquery/dist"));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(express.static("node_modules/popper.js/dist"));

app.get('/', function (req, res) {
    res.render("rooms", { title: "Home"}, function (error, html){
        console.log(error);
    });
});

app.get('/admin/rooms', function (req, res) {
    res.render("rooms", { title: "Rooms",
                          rooms: rooms});
});

app.get('/admin/rooms/add', function (req, res) {
    res.render("add");
});

app.post('/admin/rooms/add', function (req, res) {
    console.log(req)
    res.render("add");
});

app.get('/admin/users', function (req, res) {
    res.render("users", { title: "Users"});
});

app.listen(3001, function () {
    console.log("Chat app listening on port 3001");
})