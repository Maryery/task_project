const ObjectID = require('mongodb').ObjectID;
const express = require('express');
const tasksRoutes = express.Router();
const dbo = require('../db/conn');

const priorities = ['low', 'medium', 'high'];
const states = ['pending', 'done', 'canceled'];

tasksRoutes.route('/tasks').get(async function (req, res) {
	const dbConnect = dbo.getDb();

	dbConnect
		.collection('tasks')
		.find({"state":{"$ne": "deleted"}})
		.limit(50)
		.toArray(function (err, result) {
			if (err) {
				res.status(400).send('Error fetching tasks!');
			} else {
				res.json(result);
			}
		});
});

tasksRoutes.route('/tasks/:id').get(async function (req, res) {
	const dbConnect = dbo.getDb();
	const id = new ObjectID(req.params.id);
	const taskQuery = { _id: id };

	dbConnect.collection('tasks').findOne(taskQuery, function (err, result) {
		if (err) {
			res.status(400).send('Error fetching tasks!');
		} else {
			res.json(result);
		}
	});
});

tasksRoutes.route('/tasks').post(function (req, res) {
	const dbConnect = dbo.getDb();
	const doc = {
		title: req.body.title,
		state: req.body.state,
		priority: req.body.priority,
		finish_date: req.body.finish_date,
	};

	if (!priorities.includes(doc.priority)) {
		res.status(400).send('Error: Invalid priority!');
	}

	if (!states.includes(doc.state)) {
		res.status(400).send('Error: Invalid state!');
	}

	dbConnect.collection('tasks').insertOne(doc, function (err, result) {
		if (err) {
			res.status(400).send('Error inserting tasks!');
		} else {
			console.log(`Added a new task with id ${result.insertedId}`);
			res.status(204).send();
		}
	});
});

tasksRoutes.route('/tasks/:id').put(function (req, res) {
	const dbConnect = dbo.getDb();
	const id = new ObjectID(req.params.id);
	const doc = {
		$set: {
			title: req.body.title,
			state: req.body.state,
			priority: req.body.priority,
			finish_date: req.body.finish_date,
		},
	};

	if (!priorities.includes(req.body.priority)) {
		res.status(400).send('Error: Invalid priority!');
	}

	if (!states.includes(req.body.state)) {
		res.status(400).send('Error: Invalid state!');
	}

	dbConnect
		.collection('tasks')
		.updateOne({ _id: id }, doc, function (err, result) {
			if (err) {
				res.status(400).send('Error updating tasks!');
			} else {
				console.log(`Updating task with id ${id}`);
				res.status(204).send();
			}
		});
});

//Eraser hard (from database)
tasksRoutes.route('/tasks/:id').delete(async function (req, res) {
	const dbConnect = dbo.getDb();
	const id = new ObjectID(req.params.id);
	const taskQuery = { _id: id };

	dbConnect.collection('tasks').deleteOne(taskQuery, function (err, result) {
		if (err) {
			res.status(400).send('Error deleting tasks!');
		} else {
			console.log('1 document deleted');
			res.status(204).send();
		}
	});
});

//Eraser soft
tasksRoutes.route('/tasks/delete/:id').post(function (req, res) {
	const dbConnect = dbo.getDb();
	const id = new ObjectID(req.params.id);
	const doc = {
		$set: {
			state: "deleted",
		},
	};

	dbConnect
		.collection('tasks')
		.updateOne({ _id: id }, doc, function (err, result) {
			if (err) {
				res.status(400).send('Error updating tasks!');
			} else {
				console.log(`Updating task with id ${id}`);
				res.status(204).send();
			}
		});
});

module.exports = tasksRoutes;
