let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let users = require('./data/users.json');
let _ = require('lodash');

passport.use(new LocalStrategy(function(username, password, done){
    let user = _.find(users, u => u.name === username);

    if(!user || user.password !== password){
        done(null, false);
        return;
    }
    done(null, user);
}));

passport.serializeUser(function (id, done) {
    let user = _.find(users, u => u.id === id);
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    let user = _.find(users, u => u.id === id);
    done(null, user.id);
});