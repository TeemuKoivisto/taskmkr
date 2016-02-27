var express = require("express");
var router = express.Router();

var task = require("../models/task");

router.get("/task/all", task.findAll);
router.get("/task/lastid", task.findLastId);
router.post("/task", task.save);

module.exports = router;