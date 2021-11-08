import React, { useState } from 'react';
import * as S from './styles';
import Modal from 'react-modal';
import Button from '@material-ui/core/Button';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import UpdateTask from '../UpdateTask/UpdateTask';

const TaskList = ({ tasks, deleteTask, saveTask }) => {

	const handleDelete = (id) => {
		deleteTask(id);
	};

	const [isOpen, setIsOpen] = useState(false);
	const toggleModal = () => {
		setIsOpen(!isOpen);
	};

	const [currentTask, setCurrentTask] = useState(null);

	console.log(currentTask)
	const handleUpdate = (t) => {
		setCurrentTask(t);
		toggleModal();
	};

	return (
		<S.TaskList>
			{tasks.map((task) => (
				<S.TaskCard>
					<CardActionArea>
						<CardContent>
							<S.TaskContainer>
								<S.Title>{task.title}</S.Title>
								<div>state:{task.state}</div>
								<div>Finish date:{task.finish_date}</div>
								 {task.priority === "high"&& (
									<S.Priority>Prioridad: <S.HighCircle></S.HighCircle> {task.priority}</S.Priority>
									)}
									{task.priority === "medium"&& (
									<S.Priority>Prioridad: <S.MediumCircle></S.MediumCircle> {task.priority}</S.Priority>
									)}
									{task.priority === "low"&& (
									<S.Priority>Prioridad: <S.LowCircle></S.LowCircle> {task.priority}</S.Priority>
									)}
							</S.TaskContainer>
						</CardContent>
					</CardActionArea>
					<S.ButtonContainer>
						<S.ButtonContent variant="contained" onClick={()=> {handleUpdate(task)}}>
							Edit
						</S.ButtonContent>
						<S.ButtonContent
							variant="contained"
							color="secondary"
							onClick={() => {
								handleDelete(task._id);
							}}
						>
							Delete
						</S.ButtonContent>
					</S.ButtonContainer>
				</S.TaskCard>
			))}
			<Modal
				isOpen={isOpen}
				onRequestClose={toggleModal}
				contentLabel="My dialog"
			>
				<UpdateTask
					task={currentTask}
					saveTask={saveTask}
									/>
				<Button
					id="button"
					variant="contained"
					size="small"
					onClick={toggleModal}
				>
					Close modal
				</Button>
			</Modal>
		</S.TaskList>
	);
};

export default TaskList;
