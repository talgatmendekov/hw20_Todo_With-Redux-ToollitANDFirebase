import './App.css';
import React, {useEffect} from 'react'
import AddTodo from './components/todo/AddTodo';
import { useDispatch, useSelector } from 'react-redux'
import TodoList from './components/todo/TodoList';
import {getTodos} from './store/todoSlice'
import Loader from './UI/Loader';


function App() {
  const {status} = useSelector(state => state.todo)
  const  dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTodos())
  }, [dispatch])
 
  return (
    <div className="App">
      <h1>Todo App</h1>
       <AddTodo/>
       {status === 'loading' && <Loader/>}
     <TodoList/>
    </div>
  );
}

export default App;
