var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// var TaskLibrary = new Schema({
  // tasks: []
// })

var TaskSchema = new Schema({
  date: { type: Date, default: Date.now },
  task_id: { type: Number },
  title: { type: String },
  priority: { type: Number }, // either number or string
  description: { type: String },
  tags: { type: [] },
  // requires: { type: [ Schema.Types.ObjectId ] },
  requires: [ { type: Number } ],
  time_estimate: { type: Schema.Types.Mixed },
  assigned_to: { type: String },
  dod: { type: [] },
})

// var 

module.exports.Task = mongoose.model("Task", TaskSchema);