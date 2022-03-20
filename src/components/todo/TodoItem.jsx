import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteTodo, toggleTodoStatus } from '../../store/todoSlice'
import styled from 'styled-components'
import Button from '../../UI/Button'

const TodoItem = (props) => {
	const dispatch = useDispatch()

	const deleteTodoHandler = (id) => dispatch(deleteTodo(id));

	const checkTodoHandler = (id) => dispatch(toggleTodoStatus(id))

	
	return (
		<StyledLi checked={props.completed}>
			<input
				type='checkbox'
				checked={props.completed}
				onChange={() => checkTodoHandler(props.id)}
			/>
			<span>{props.title}</span>
			<span>{props.date}</span>
			<Button onClick={() => deleteTodoHandler(props.id)}>
				delete
			</Button>
		</StyledLi>
	)
}

const StyledLi = styled.li`
	background-color: grey;
	
	span {
		text-decoration: ${(props) => (props.checked ? 'line-through' : '')};
		text-decoration-color: ${props => props.checked ? 'red' : ''};
		font-weight: 700;
	}
	button {
		background-color: grey;
		color: white;
		width: 15%;
	}
`
export default TodoItem
