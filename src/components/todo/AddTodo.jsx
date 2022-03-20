import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { addNewTodo } from '../../store/todoSlice'
import styled from 'styled-components'
import Button from '../../UI/Button'
import {Alert} from '@mui/material'

const AddTodo = () => {
	const [todoTitle, setTodoTitle] = useState('')
	const [isValid, setIsValid] = useState(true);

	const dispatch = useDispatch()

	const inputChangeHandler = (event) => {
		if(todoTitle.trim().length > 0){
			setIsValid(true)
		}
		setTodoTitle(event.target.value)
		
	}

	const addTodoHandler = (event) => {
		event.preventDefault()
		if(todoTitle.trim() === '') {
			setIsValid(false)
			return 
			
		}
		dispatch(addNewTodo(todoTitle))
		setTodoTitle('')
	}
	return (
		<StyledCard>
			{!isValid && <Alert className='alert' severity='error'>No todos found.. Type something!</Alert>}
			<form onSubmit={addTodoHandler}>
			
				<input value={todoTitle} type='text' onChange={inputChangeHandler} />
				<Button>Add Todos...</Button>
			</form>
		</StyledCard>
	)
}
const StyledCard = styled.div`
	background: rgb(175, 172, 174);
	box-shadow: 0 2px 8px #222222;
	border-radius: 15px;
	padding: 1rem;
	margin: 1rem;
	.alert{
		text-align: left;
		color: red;
		margin-bottom: 1rem;
		padding:0;
	}
	input {
		width: 200px;
		border-radius: 10px;
		padding: 0.25rem 0.25rem;
		border-color: whitesmoke;
	}
	button {
		width: 15%;
	}
`
export default AddTodo
