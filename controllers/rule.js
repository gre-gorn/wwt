var db = require('../db'),
        Rule = require('../models/rule.js'),
        Session = require('../models/session.js');

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

        Rule.findOne({ name: req.body.name }, function(err, route) {
            if (err || route === null) {
                console.log("Rule " + req.body.name + " not found.");
                res.json({status: false, err: err});
                return console.error(err);
            }

            res.json({status: true, details: {id: route.id, name: route.name, created: route.created, updated: route.updated, from: route.from, to: route.to, founder: route.founder}});
            console.log("Rule details" + route);
        });
        return;
    });
};

exports.list = function (req, res) {
    Rule.find(function (err, routes) {
        if (err) {
            res.json({status: false, err: err});
            return console.error(err);
        }

        //remember about context lose outside the function
        var routesJSON = new Array();

        routes.forEach(function (route) {
            routesJSON.push({id: route.id, name: route.name, created: route.created, updated: route.updated, from: route.from, to: route.to, founder: route.founder});
        });

        res.json({status: true, items: routesJSON});
    });
};

exports.create = function (req, res) {
    console.log('req.body: ' + req.body);

    Rule.findOne({ name: req.body.name }, function(err, route) {
        if (err || route !== null) {
            console.log("Rule " + req.body.name + " already created.");
            if (route !== null) {
                res.json({status: false, err: "Rule " + req.body.name + " already created."});
            } else {
                res.json({status: false, err: err.errmsg});
            }
            return console.error(err);
        }

        var item = new Rule({name: req.body.name, from: req.body.from, to: req.body.to, founder: req.body.founder});
        item.save(function (err) {
            if (err) {
                res.json({status: false, err: err.errmsg});
                return console.error(err);
            }
            //saved!
            res.json({status: true});
        });
        console.log("New Rule details:" + item);
    });
};
