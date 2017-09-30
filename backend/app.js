//dependencies
const express = require('express');
const morgan = require('morgan');

const bodyParser = require('body-parser');

const app = express();


app.use(morgan('dev'));
app.use(bodyParser.json());

//intialize all routes
require('./config/routes')(app);

//could be used to test form browser if server is up or not
app.get('/', function (req, res) {
   res.send('Hello!');
})

app.listen(3000, function () {
   console.log('Example app listening on port 3000!');
})