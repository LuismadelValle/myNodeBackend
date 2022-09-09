const mysql = require('mysql');
var express = require('express');
var router = express.Router();
var pool = mysql.createPool({
	connectionLimit: 1000,
	host: 'localhost',
	user: 'luismadf',
	password: 'Laventador@123',
	database: 'mytrellocopy'
});

var getConnection = function(cb){
	pool.getConnection(function(err, connection){
		if (err) throw err;
		cb(null, connection);
	});
};
module.exports = getConnection;