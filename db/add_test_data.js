var Q = require('q');
var models = require('../models/models');

var Task = models.Task;

module.exports.removeAll = function() {
  Task
  .remove()
  .exec()
}

module.exports.addData = function() {
  var task1 = new Task({
    task_id: 1,
    title: 'yo',
    priority: 666,
    description: 'yo yo',
    tags: ['feature', 'directive'],
    time_estimate: { min: 2, max: 4, unit: 'hour'},
    assigned_to: ['teemu'],
    dod: ['shit is done']
  })
  var task2 = new Task({
    task_id: 2,
    title: 'toka',
    priority: 5,
    description: 'toka',
    tags: ['feature', 'directive'],
    requires: [1],
    time_estimate: { min: 2, max: 4, unit: 'hour'},
    assigned_to: ['teemu'],
    dod: ['shit is done']
  })
  var task3 = new Task({
    task_id: 3,
    title: 'kolmas',
    priority: 5,
    description: 'kolmas',
    tags: ['feature', 'directive'],
    requires: [1],
    time_estimate: { min: 2, max: 4, unit: 'hour'},
    assigned_to: ['teemu'],
    dod: ['shit is done']
  })
  var task4 = new Task({
    task_id: 4,
    title: 'filleri',
    priority: 5,
    description: 'stuff',
    tags: ['feature', 'directive'],
    requires: [1],
    time_estimate: { min: 2, max: 4, unit: 'hour'},
    assigned_to: ['teemu'],
    dod: ['shit is done']
  })
  var task5 = new Task({
    task_id: 5,
    title: 'filleri',
    priority: 5,
    description: 'stuff',
    tags: ['feature', 'directive'],
    requires: [1],
    time_estimate: { min: 2, max: 4, unit: 'hour'},
    assigned_to: ['teemu'],
    dod: ['shit is done']
  })
  var task6 = new Task({
    task_id: 6,
    title: 'filleri',
    priority: 5,
    description: 'stuff',
    tags: ['feature', 'directive'],
    requires: [1],
    time_estimate: { min: 2, max: 4, unit: 'hour'},
    assigned_to: ['teemu'],
    dod: ['shit is done']
  })
  var task7 = new Task({
    task_id: 7,
    title: 'filleri',
    priority: 5,
    description: 'stuff',
    tags: ['feature', 'directive'],
    requires: [1],
    time_estimate: { min: 2, max: 4, unit: 'hour'},
    assigned_to: ['teemu'],
    dod: ['shit is done']
  })

  Q.all([
    Task.remove().exec()
  ]).spread(function() {
    return Q.all([
      task1.save(),
      task2.save(),
      task3.save(),
      task4.save(),
      task5.save(),
      task6.save(),
      task7.save(),
    ])
  }).spread(function() {
    console.log("Test data saved succesfully");
  }).catch(function(err) {
    console.log("Error in add_test_data " + err);
  })
}