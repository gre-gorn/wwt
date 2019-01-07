var db = require('../db'),
        Route = require('../models/route.js'),
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

        Route.findOne({ name: req.body.name }, function(err, route) {
            if (err || route === null) {
                console.log("Route " + req.body.name + " not found.");
                res.json({status: false, err: err});
                return console.error(err);
            }

            res.json({status: true, details: {id: route.id, name: route.name, created: route.created, updated: route.updated, from: route.from, to: route.to, founder: route.founder}});
            console.log("Route details" + route);
        });
        return;
    });
};

exports.list = function (req, res) {
    Route.find(function (err, routes) {
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

    Route.findOne({ name: req.body.name }, function(err, route) {
        if (err || route !== null) {
            console.log("Route " + req.body.name + " already created.");
            if (route !== null) {
                res.json({status: false, err: "Route " + req.body.name + " already created."});
            } else {
                res.json({status: false, err: err.errmsg});
            }
            return console.error(err);
        }

        var item = new Route({name: req.body.name, from: req.body.from, to: req.body.to, founder: req.body.founder});
        item.save(function (err) {
            if (err) {
                res.json({status: false, err: err.errmsg});
                return console.error(err);
            }
            //saved!
            res.json({status: true});
        });
        console.log("New Route details:" + item);
    });
};
