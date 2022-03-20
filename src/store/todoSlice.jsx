import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'

import { BASE_URL } from '../helpers/constants'

export const getTodos = createAsyncThunk('todos/getTodos', async function (_, {rejectWithValue}) {
	try {
		const response = await fetch(`${BASE_URL}/todos.json`)
		if (!response.ok) {
			throw new Error('Out of Server!')
		}
		const data = await response.json()
		const todoData = []

		for (const key in data) {
			todoData.push({
				title: data[key].title,
				date: data[key].date,
				completed: data[key].completed,
				id: key,
			})
		}
		
		return todoData
	} catch (error) {
        return rejectWithValue(error.message)
    }
});

export const addNewTodo = createAsyncThunk(
	'todos/addNewTodo',
	async function (todoTitle, {rejectWithValue}) {

        try {
            const todo = {
                title: todoTitle,
				date: new Date().toLocaleDateString(),
                completed: false,
                 
            }
    
            const response = await fetch(`${BASE_URL}/todos.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(todo),
            })
    
            const data = await response.json()
            if (!response.ok) {
                throw new Error('Server error. Can not add todo task')
            }
    
            
            return {...todo, id: data.name}

        } catch (error) {
            return rejectWithValue(error.message)
        }
	
	},
)

export const deleteTodo = createAsyncThunk(
	'todos/deleteTodo',
	async function (id, { dispatch, rejectWithValue }) {
        try {
            const response = await fetch(`${BASE_URL}/todos/${id}.json`, {
                method: 'DELETE',
            })
            if (!response.ok) {
                throw new Error('Server error. Can not delete todo task')
            }
            dispatch(todoActions.removeTodo(id))

        } catch (error) {
            return rejectWithValue(error.message)
        }
		
	},
)

export const toggleTodoStatus = createAsyncThunk(
	'todos/toggleTodoStatus',
	async function (id, { dispatch, getState, rejectWithValue}) {
		const todo = getState().todo.todos.find((todo) => todo.id === id);

        try {
            const response = await fetch(`${BASE_URL}/todos/${id}.json`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    completed: !todo.completed,
                }),
            })
    
            if (!response.ok) {
                throw new Error('Server error. Can not change todo task status')
            }
            dispatch(todoActions.completeTodo(id))

        } catch (error) {
            return rejectWithValue(error.message)
        }

		
	},
)

const setError = (state, action) => {
	state.status = 'rejected'
	state.error = action.payload
}

const initState = {
	todos: [],
	status: null,
	error: null,
}

const todoSlice = createSlice({
	name: 'todo',
	initialState: initState,
	reducers: {
		addTodo(state, action) {
			const newTodo = action.payload
			state.todos = [...state.todos, newTodo]
		},

		removeTodo(state, action) {
			console.log(action)
			const deletedTodo = state.todos.filter(
				(el) => el.id !== action.payload,
			)
			state.todos = deletedTodo
		},
		completeTodo(state, actions) {
			const completeTodo = state.todos.map((todo) => {
				if (todo.id === actions.payload) {
					todo.completed = !todo.completed
				}
				return todo
			})
			state.todos = completeTodo
		},
	},
	extraReducers: {
		[addNewTodo.pending]: (state) => {
			state.status = 'loading'
			state.error = null
		},
		[addNewTodo.fulfilled]: (state, action) => {
			state.status = 'resolved'
			state.error = null
			state.todos = [...state.todos, action.payload]
		},
		
		[getTodos.pending]: (state) => {
			state.status = 'loading'
			state.error = null
		},
		[getTodos.fulfilled]: (state, action) => {
			state.status = 'resolved'
			state.todos = action.payload
		},
		
		[deleteTodo.pending]: (state) => {
			state.status = 'resolved'
			state.error = null
		},
		[deleteTodo.fulfilled]: (state) => {
			state.status = 'resolved'
		},
		[toggleTodoStatus.pending]: (state) => {
			state.status = 'loading'
			state.error = null
		},
		[toggleTodoStatus.fulfilled]: (state) => {
			state.status = 'resolved'
		},

		[getTodos.rejected]: setError,
		[deleteTodo.rejected]: setError,
		[toggleTodoStatus.rejected]: setError,
	},
})

export const todoActions = todoSlice.actions
export default todoSlice
