var express = require("express");
var app = express();
var bodyParser = require("body-parser");

require("./db/add_test_data");

var db = require("./db/mongodb_connection");
db.connect;

var logger = require("morgan");
app.use(logger("dev"));

app.use(express.static("public/"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var router = require("./routes/index");
app.use("", router);

app.set("port", (process.env.PORT || 3000));

app.listen(app.get("port"), function () {
    console.log("App is listening on port", app.get("port"));
});