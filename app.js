const http = require('http');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const hostname = 'localhost';
const port = 8081;

var app = express();
var getConnection = require('./mysqlConnection');

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

app.get('/', cors(), (req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.send();
})

// routes for cards, basic querying for getting cards, post, put  and delete

app.route('/cards', cors())
	.get(function getCards(req, res) {
		var getAllCards = "SELECT * FROM cards";

		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/plain');

		getConnection(function(err, con){
			if (err) throw err;
			con.query(getAllCards, function(err, result, fields){
				if (err) throw err;
				res.send(result);
			});
			con.release();
		});
	})
	.post(function postCards(req, res) {
		var title = req.body.title;
		var addCard = "INSERT INTO cards(title) VALUES (?)";

		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/plain');
		getConnection(function(err, con){
			if (err) throw err;
			con.query(addCard, title, function(err, result){
				if (err) throw err;
				res.send(result);
			});
			con.release();
		});
	})
	.put(function putCards(req, res) {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/plain');
		res.send('putted new cards');
		console.log('working');
	})
	.delete(function deleteCards(req, res) {
		var id = req.body.id;
		var deleteRecord = "DELETE FROM cards where id = (?)";

		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/plain');
		
		getConnection(function(err, con){
			if (err) throw err;
			con.query(deleteRecord, id, function(err, result, fields){
				if(err) throw err;
				res.send(result);
			});
			con.release();
		});
	})

// tasks queries, get, post, delete and put for updating the tasks

app.route('/tasks', cors())
	.get(function getTasks(req, res) {
		var selectAllTasks = "SELECT * FROM tasks";

		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/plain');

		getConnection(function(err, con){
			if (err) throw err;
			con.query(selectAllTasks, function(err, result, fields){
				if(err) throw err;
				res.send(result);
			});
			con.release();
		});
	})
	.post(function postCards(req, res) {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/plain');
		res.send('post tasks');
		console.log('working');
	})
	.put(function putTasks(req, res) {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/plain');
		res.send('put tasks');
		console.log('working');
	})
	.delete(function deleteTasks(req, res){
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/plain');
		res.send(req.body.data);
		console.log('working');
	})

// get all tasks due to single card ID

app.route('/tasks/:cardId', cors())
	.get(function getSingleTask(req, res){
		var id = req.params.cardId;
		var taskIdQuery = "SELECT * FROM tasks WHERE CardId = ?" ;

		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/plain');

		getConnection(function(err, con){
			if (err) throw err;
			con.query(taskIdQuery, id, function(err, result, fields){
				if(err) throw err;
				res.send(result);
			});
			con.release();
		});
	})

app.route('/cards/:id')
	.get(function getSingleCard(req, res){
		var id = req.params.id;
		var cardByID = "SELECT * FROM cards where id = ?";

		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/plain');

		getConnection(function(err, con){
			if (err) throw err;
			con.query(cardByID, id, function(err, result, fields){
				if (err) throw err;
				res.send(result);
			});
			con.release();
		});
	})

app.listen(port, function(err){
    if (err) console.log(err);
}); 


