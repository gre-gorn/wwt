var db = require('../db'),
        User = require('../models/user.js'),
        Session = require('../models/session.js');

exports.login = function (req, res) {
    console.log('req.headers: ' + JSON.stringify(req.headers));

    if (req.body.username === undefined || req.body.password === undefined) {
        res.json({status: false, err: "Param missing!"});
        return;
    }

    User.findOne({ email: req.body.username }, function(err, user) {
        if (err || user === null) {
            console.log("User " + req.body.username + " not found.");
                if (user === null)
                    res.json({status: false, err: "User " + req.body.username + " not found."});
                else
                    res.json({status: false, err: err.errmsg});
            return console.error(err);
        }

        user.comparePassword(req.body.password, function(err, isMatch) {
            if (err || isMatch === false) {
                console.log("Password for user " + req.body.username + " do not match.");
                if (isMatch === false)
                    res.json({status: false, err: "Password for user " + req.body.username + " do not match."});
                else
                    res.json({status: false, err: err.errmsg});
                return;
            }
            
            var item = new Session({email: req.body.username, agent: req.get("user-agent") });

            item.save(function (err) {
                if (err) {
                    res.json({status: false, err: err.errmsg});
                    return console.error(err);
                }

                var token = new Buffer(item.id).toString('base64');

                res.json({status: true, token: token});

                //TODO: expand sessions functionality
                console.log("User " + req.body.username + " logged in.");
                console.log("Session " + item.id + " created.");
            });

            return;
        });
    });
};

exports.logout = function (req, res) {
    var user_id = req.params.id;

    User.findOne({ _id: user_id }, function(err, user) {
        if (err || user === null) {
            res.json({status: false, err: err});
            return console.error(err);
        }

        console.log("User " + user.email + " found.");

        var session_id = new Buffer(req.get("token"), 'base64');

        Session.findOne({ _id: session_id }, function(err, session) {
            if (err || session === null) {
                res.json({status: false, err: err.errmsg});
                return console.error(err);
            }
            if (session.email === user.email) {
                session.remove( {id: session_id}, function(err) {
                    if (err) {
                        res.json({status: false, err: err.errmsg});
                        return console.error(err);
                    }

                    res.json({status: true});
                    console.log("User " + user.email + " logged out from session " + session_id);
                });  
            }
            return;
        });
    });
};

exports.details = function (req, res) {
    console.log("called details: " + JSON.stringify(req.params));
    var session_id = new Buffer(req.get("token"), 'base64');

    console.log("Session " + session_id);

    Session.findOne({ _id: session_id }, function(err, session) {
        if (err || session === null) {
            console.log("Session " + session_id + " not found.");
            res.json({status: false, err: err});
            return console.error(err);
        }

        console.log("Session details: " + session);
        var user_email = session.email;

        User.findOne({ email: user_email }, function(err, user) {
            if (err || user === null) {
                console.log("User " + user_email + " not found.");
                res.json({status: false, err: err});
                return console.error(err);
            }
            res.json({status: true, details: {id: user.id, email: user.email, name: user.name, lastname: user.lastname, address: user.address}});
            console.log("User details" + user);
        });
        return;
    });
};

exports.list = function (req, res) {
    User.find(function (err, users) {
        if (err) {
            res.json({status: false, err: err});
            return console.error(err);
        }

        //remember about context lose outside the function
        var usersJSON = new Array();

        users.forEach(function (user) {
            usersJSON.push({id: user.id, name: user.name, lastname: user.lastname, address: user.address, email: user.email});
        });

        res.json({status: true, users: usersJSON});
    });
};

exports.register = function (req, res) {
    console.log('req.body: ' + req.body);
    if (req.body.name === undefined || req.body.lastname === undefined || req.body.address === undefined || req.body.email === undefined || req.body.password === undefined) {
        res.json({status: false, err: "Param missing!"});
        return;
    }

    User.findOne({ email: req.body.email }, function(err, user) {
        if (err || user !== null) {
            console.log("User " + req.body.email + " already registered.");
            if (user !== null) {
                res.json({status: false, err: "User " + req.body.email + " already registered."});
            } else {
                res.json({status: false, err: err.errmsg});
            }
            return console.error(err);
        }

        var item = new User({name: req.body.name, lastname: req.body.lastname, address: req.body.address, email: req.body.email, password: req.body.password});
        item.save(function (err) {
            if (err) {
                res.json({status: false, err: err.errmsg});
                return console.error(err);
            }
            //saved!
            res.json({status: true});
        });
        console.log("New User details:" + item);
    });
};
