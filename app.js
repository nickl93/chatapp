let express = require("express");
let uuid = require("node-uuid");
let bodyParser = require("body-parser");
let passport = require("passport");
require("./passport-init");
// My Modules
let adminRouter = require("./admin");
let apiRouter = require("./api");
let authRouter = require("./auth");

let app = express();

app.set("views", "views");
app.set("view engine", "jade");


app.use(require("./logging"));
app.use(require('express-session') ({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(express.static("public"));
app.use(express.static("node_modules/jquery/dist"));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(express.static("node_modules/popper.js/dist"));
app.use(express.static("node_modules/font-awesome"));
//require('express-debug')(app, {});
app.use((bodyParser.urlencoded({ extended: true})));
app.use((bodyParser.json()));
app.use(function (req, res, next) {
   console.log("Incoming request: "+req.url);
   next();
});
// My Modules
app.use("/admin", adminRouter);
app.use("/api", apiRouter);
app.use(authRouter);
app.use(passport.initialise());
app.use(passport.session());

app.get('/', function (req, res) {
    res.render("home", { title: "Home"});
});

app.use(function(error, req, res, next) {
    res.send("Something")
});

app.listen(3001, function () {
    console.log("Chat app listening on port 3001");
});