var Q = require('q');
var models = require('../models/models');

var Task = models.Task;

var task1 = new Task({
	content: {
		id: 1,
		title: "testi1",
		tags: ["no", "drugs"]
	}
});

Q.all([
	Task.remove().exec()
]).spread(function() {
	return Q.all([
		task1.save()
	])
}).spread(function() {
	console.log("Test data saved succesfully");
}).catch(function(err) {
	console.log("Error in add_test_data " + err);
})
