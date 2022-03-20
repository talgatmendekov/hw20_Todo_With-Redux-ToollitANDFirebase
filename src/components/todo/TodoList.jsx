import React from 'react'
import { useSelector } from 'react-redux'
import TodoItem from './TodoItem'
import styled from 'styled-components'

const TodoList = () => {
	const todos = useSelector((state) => (state.todo.todos))
	 
	return (
		<StyledTodoList>
			{todos.map((todo) => {
				return (
					<TodoItem
						key={todo.id}
						id={todo.id}
						date={todo.date}
						title={todo.title}
						completed={todo.completed}
					/>
				)
			})}
		</StyledTodoList>
	)
}

const StyledTodoList = styled.ul`
	padding: 1rem;
	li{
		border: 1px solid #ccc;
		margin:0.5rem 0;
		padding: 0.5rem;
		display:flex;
		justify-content:space-around;
		border-radius: 5px;
	}
`

export default TodoList
