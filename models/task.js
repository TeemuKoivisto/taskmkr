var mongoose = require("mongoose");
var Q = require("q");

var models = require("../models/models");
var Task = models.Task;

module.exports.findAll = function(req, res) {
	Task
	.find({})
	.then(function(tasks) {
		if (tasks) {
			res.send(tasks);
		} else {
			res.send([]);
		}
	})
	.catch(function(err) {
		console.log("Error in task findAll " + err);
		res.status(500).send("Error in task findAll " + err);
	})
}

module.exports.save = function(req, res) {
	if (!req.body.task) {
		res.status(200).send('No content in task');
	}
	var task = new Task(JSON.parse(req.body.task));
	
	task
	.save()
	.then(function(task) {
		res.status(200).send(task);
	})
	.catch(function(err) {
		console.log("Error in task save " + err);
		res.status(500).send("Error in task save " + err);
	})
}