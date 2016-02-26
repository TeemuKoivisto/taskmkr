var express = require('express');
var app = express();

var logger = require('morgan');
app.use(logger('dev'));

app.use(express.static('public/'));

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function () {
    console.log('app is listening on port', app.get('port'));
});