var mongoose = require("mongoose");
var Q = require("q");

var models = require("../models/models");
var Task = models.Task;

module.exports.findLastId = function(req, res) {
	Task
	.findOne({ $query: {}, $orderby: { task_id: -1 }})
	// .find()
	// .sort({ task_id: -1 })
	// .limit(1)
	// .pretty()
	.then(function(task) {
		if (task) {
			res.send(task);
		} else {
			res.status(404).send("Last task_id not found");
		}
	})
	.catch(function(err) {
		console.log("Error in task findLastId " + err);
		res.status(500).send("Error in task findLastId " + err);
	})
}

module.exports.findAll = function(req, res) {
	Task
	.find()
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
	if (!req.body) {
		res.status(200).send('No content in task');
	}
	var stringified = JSON.stringify(req.body);
	var obj = JSON.parse(stringified);
	// console.log("", obj);
	var task = new Task(obj);
	
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