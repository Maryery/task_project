import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
const apiUrl = process.env.REACT_APP_API_URL;

const CreateTask = ({saveTask}) => {
	const [error, setError] = useState(null);
	const [title, setTitle] = useState('');
	const changeTitle = (e) => {
		setTitle(e.target.value);
	};

	const [priority, setPriority] = useState('low');
	const changePriority = (e) => {
		setPriority(e.target.value);
	};

	const [state, setState] = useState('pending');
	const changeState = (e) => {
		setState(e.target.value);
	};

	const [date, setDate] = useState('');
	const changeDate = (e) => {
		setDate(e.target.value);
	};

	const createTask = () => {
		const task = {
			title: title,
			priority: priority,
			state: state,
			finish_date: date,
		};
		const options = {
			method: 'POST',
			body: JSON.stringify(task),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
		},
		};
		fetch(`${apiUrl}/tasks`, options)
			.then(
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
			<h1>Create Task</h1>
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
				onClick={createTask}
			>
				Create task
			</Button>
		</>
	);
};

export default CreateTask;
