import { useState, useEffect } from 'react';
import { Plus, Trash2, Check, ListTodo } from 'lucide-react';
import clsx from 'clsx';
import './index.css';

export default function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      return JSON.parse(saved);
    } else {
      return [
        { id: crypto.randomUUID(), text: 'Learn React', completed: true },
        { id: crypto.randomUUID(), text: 'Master beautiful web design', completed: false }
      ];
    }
  });

  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    setTodos([
      { id: crypto.randomUUID(), text: inputValue.trim(), completed: false },
      ...todos
    ]);
    setInputValue('');
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="glass-container">
      <h1>Task Master</h1>
      
      <form onSubmit={handleAddTodo} className="input-wrapper">
        <input
          type="text"
          className="input-field"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="btn" aria-label="Add Task">
          <Plus size={20} style={{ marginRight: '6px' }} />
          Add
        </button>
      </form>

      <ul className="todo-list">
        {filteredTodos.length === 0 ? (
          <li className="empty-state">
            <ListTodo size={48} />
            <p>No tasks found. Time to relax or add some!</p>
          </li>
        ) : (
          filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className={clsx('todo-item', { 'completed': todo.completed })}
            >
              <div
                className="todo-content"
                onClick={() => toggleTodo(todo.id)}
              >
                <div className="checkbox-container">
                  {todo.completed && <Check size={16} color="white" strokeWidth={3} />}
                </div>
                <span className="todo-text">{todo.text}</span>
              </div>
              
              <button
                className="btn-icon"
                onClick={() => deleteTodo(todo.id)}
                aria-label="Delete Task"
                title="Delete"
              >
                <Trash2 size={20} />
              </button>
            </li>
          ))
        )}
      </ul>

      {todos.length > 0 && (
        <div className="filters">
          <button
            className={clsx('filter-btn', { 'active': filter === 'all' })}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={clsx('filter-btn', { 'active': filter === 'active' })}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button
            className={clsx('filter-btn', { 'active': filter === 'completed' })}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
      )}
    </div>
  );
}
