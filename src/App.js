import './App.css';
import React, {useEffect} from 'react'
import AddTodo from './components/todo/AddTodo';
import { useDispatch, useSelector } from 'react-redux'
import TodoList from './components/todo/TodoList';
import {getTodos} from './store/todoSlice'
import Loader from './UI/Loader';


function App() {
  const {status , error} = useSelector(state => state.todo)
  console.log(error)
  const  dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTodos())
  }, [dispatch])
 
  return (
    <div className="App">
      <h1>Todo App</h1>
       <AddTodo/>
       {status === 'loading' && <Loader/>}
       {error && <h2>An error occured: {error}</h2>}
     <TodoList/>
    </div>
  );
}


export default App;
