var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// var TaskLibrary = new Schema({
	// tasks: []
// })

var TaskSchema = new Schema({
	date: { type: Date, default: Date.now },
	task_id: { type: Number },
	title: { type: String },
	description: { type: String },
	priority: { type: Number },
	tags: { type: [] },
	requires: { type: [ Schema.Types.ObjectId ] },
	time_estimate: { type: Schema.Types.Mixed },
	dod: { type: [] },
})

module.exports.Task = mongoose.model("Task", TaskSchema);