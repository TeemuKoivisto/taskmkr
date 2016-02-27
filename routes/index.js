var express = require("express");
var router = express.Router();

var task = require("../models/task");

router.get("/tasks", task.findAll);
router.post("/task", task.save);

module.exports = router;