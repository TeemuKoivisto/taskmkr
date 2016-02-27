var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var TaskLibrary = new Schema({
	tasks: []
})

var TaskSchema = new Schema({
	date: { type: Date, default: Date.now },
	content: { Schema.Types.Mixed }
})

module.exports.Task = mongoose.model("Task", CommentSchema);