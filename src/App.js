import React, { useState, useCallback } from 'react';
import './App.css';

/**
 * The application itself.
 * 
 * @var App
 */
const App = () => {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState([]);

  /**
   * When the user submits the form.
   * 
   * @param event 
   */
  const addTodo = useCallback((event) => {
    event.preventDefault();

    console.log('The form has been submitted.');

    if (!newTodo.trim()) {
      return;
    }

    setTodos([
      ...todos,
      {
        id: todos.length ? todos[todos.length - 1].id + 1 : 1,
        value: newTodo,
        done: false,
      },
    ], [newTodo, todos]);

    setNewTodo('');
  }, [newTodo, todos]);

  /**
   * When the input changes.
   * 
   * @param event 
   */
  const onInputChange = useCallback((event) => {
    setNewTodo(event.target.value);
  }, []);

  /**
   * When the checkbox changes.
   * 
   * @param event
   */
  const updateTodo = useCallback((todo, index) => (event) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1, {
      ...todo,
      done: !todo.done
    });

    setTodos(newTodos);
  });

  /**
   * When we want to remove the todo.
   * 
   * @param event
   */
  const removeTodo = useCallback((todo) => (event) => {
    setTodos(todos.filter(otherTodo => otherTodo !== todo));
  }, [todos]);

  /**
   * When we want to update all todos.
   * 
   * @param event
   */
  const markAllDone = useCallback (() => {
    const updatedTodos = todos.map (todo => {
      return {
        ...todo,
        done: true,
      };
    });

    setTodos(updatedTodos);
  }, [todos]);

  return (
    <div>
      <h1>Todo:</h1>
      <form onSubmit={addTodo}>
        <label htmlFor="todo">Enter a todo:</label>
        <input
          id="todo"
          name="todo"
          value={newTodo}
          onChange={onInputChange}
        />
        <button>Add todo</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={todo.id}>
            <input 
              checked={todo.done}
              type="checkbox"
              onChange={updateTodo(todo, index)}
            />
            <span className={todo.done ? 'line-through' : ''}>{todo.value}</span>
            <button onClick={removeTodo(todo)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      {todos.length ? <button onClick={markAllDone}>Mark all done</button> : ''}
    </div>
  );
};

export default App;
