import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Button from '@material-ui/core/Button';
import TaskList from './components/TaskList/TaskList';
import CreateTask from './components/CreateTask/CreateTask';
import './App.css';
const apiUrl = process.env.REACT_APP_API_URL;


function App() {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [tasks, setTasks] = useState([]);
	const [isOpen, setIsOpen] = useState(false);

	const toggleModal = () => {
		setIsOpen(!isOpen);
	};

	const saveTask = () => {
		setIsOpen(false);
		window.location.reload();
	};

	const deleteTask = (id) => {
		const options = {
			method: 'POST',
		};

		fetch(`${apiUrl}/tasks/delete/${id}`, options).then(
			(result) => {
				setIsLoaded(true);
				window.location.reload();
			},
			(error) => {
				setIsLoaded(true);
				setError(error);
			}
		);
	};

	useEffect(() => {
		fetch(`${apiUrl}/tasks`)
			.then((res) => res.json())
			.then(
				(result) => {
					setIsLoaded(true);
					setTasks(result);
				},
				(error) => {
					setIsLoaded(true);
					setError(error);
				}
			);
	}, []);

	if (error) {
		return <div>Error: {error.message}</div>;
	} else if (!isLoaded) {
		return <div>Loading...</div>;
	} else {
		return (
			<div className="App">
				<header className="App-header">
					<h1>Tasks Manager</h1>
					<TaskList tasks={tasks} deleteTask={deleteTask} saveTask={saveTask} />
					<Button variant="contained" color="primary" onClick={toggleModal}>
						Create Task
					</Button>
					<Modal
						isOpen={isOpen}
						onRequestClose={toggleModal}
						contentLabel="My dialog"
					>
						<CreateTask saveTask={saveTask} />
						<Button
							id="button"
							variant="contained"
							size="small"
							onClick={toggleModal}
						>
							Close modal
						</Button>
					</Modal>
				</header>
			</div>
		);
	}
}

export default App;
