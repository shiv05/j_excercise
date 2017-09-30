//creates single connection for the entire project
const mysql = require('mysql');
const config = require('../config/config')

//initialise mysql
var con = mysql.createConnection(config.db);
con.connect(function(err) {
  if (err){
  	console.error("Error while connecting to db\n" + err + "\n");
  	throw err;
  }
  console.log("Connected to database!");
});

module.exports = con;