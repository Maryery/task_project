import React, { useState } from 'react';
import Button from '@material-ui/core/Button';

const UpdateTask = ({ task, saveTask }) => {
	const [error, setError] = useState(null);
	const [title, setTitle] = useState(task.title);
	const changeTitle = (e) => {
		setTitle(e.target.value);
	};

	const [priority, setPriority] = useState(task.priority);
	const changePriority = (e) => {
		setPriority(e.target.value);
	};

	const [state, setState] = useState(task.state);
	const changeState = (e) => {
		setState(e.target.value);
	};

	const [date, setDate] = useState(task.finish_date);
	const changeDate = (e) => {
		setDate(e.target.value);
	};

	const updateTask = () => {
		const data = {
			title: title,
			priority: priority,
			state: state,
			finish_date: date,
		};
		const options = {
			method: 'PUT',
			body: JSON.stringify(data),
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		};

		fetch(`http://localhost:5000/tasks/${task._id}`, options).then(
			(result) => {
				saveTask();
			},
			(error) => {
				setError(error);
			}
		);
	};

	return (
		<>
			<h1>Update Task</h1>
			<form id="taskform">
				<div>
					<label>Title: </label>
					<input
						type="text"
						name="title"
						value={title}
						onChange={changeTitle}
					/>
				</div>
				<div>
					<label for="priorities">Priority: </label>
					<select
						name="priorities"
						id="priorities"
						form="taskform"
						value={priority}
						onChange={changePriority}
					>
						<option value="low">low</option>
						<option value="medium">medium</option>
						<option value="high">high</option>
					</select>
				</div>
				<div>
					<label>State: </label>
					<select
						name="states"
						id="states"
						form="taskform"
						value={state}
						onChange={changeState}
					>
						<option value="pending">pending</option>
						<option value="done">done</option>
						<option value="canceled">canceled</option>
					</select>
				</div>
				<label>Finish Date: </label>
				<input type="date" name="date" value={date} onChange={changeDate} />
			</form>
			<p>{error}</p>
			<Button
				id="button"
				variant="contained"
				size="small"
				color="primary"
				onClick={updateTask}
			>
				Update task
			</Button>
		</>
	);
};

export default UpdateTask;
