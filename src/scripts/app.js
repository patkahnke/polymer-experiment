var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

// modules
var articles = require('./routes/articles.js');
var index = require('./routes/index.js');


// middleware
app.use(express.static(path.join(__dirname, '../../')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// express routes
app.use('/articles', articles);
app.use('/', index);

// start server
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function () {
  console.log('listening on port ', app.get('port'));
});
