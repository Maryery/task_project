import styled from '@emotion/styled';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

export const MainContainer = styled.div`
`;

export const TaskCard = styled(Card)`
	width: 200px;
	height: 200px;
	margin-bottom: 10px;
	margin-right: 10px;
`;

export const TaskList = styled.ul`
	display: flex;
	width: 50vw;
	flex-wrap: wrap;
	justify-content: center;
	list-style: none;
	padding: 0;
`;

export const TaskContainer = styled.li`
	display: flex;
	flex-direction: column;
`;

export const Title = styled.h2``;

export const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-around;
	margin-top: 10px;
	margin-bottom: 5px;
`;

export const ButtonContent = styled(Button)`
	width: 50px;
	height: 20px;
	font-size: 10px;
`;

export const Priority = styled.div`
	text-transform: uppercase;
`;

export const HighCircle = styled.span`
	height: 10px;
	width: 10px;
	background-color: red;
	border-radius: 50%;
	display: inline-block;
`;
export const MediumCircle = styled.span`
	height: 10px;
	width: 10px;
	background-color: yellow;
	border-radius: 50%;
	display: inline-block;
`;
export const LowCircle = styled.span`
	height: 10px;
	width: 10px;
	background-color: green;
	border-radius: 50%;
	display: inline-block;
`;