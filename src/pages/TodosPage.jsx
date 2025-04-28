import React, { useState, useEffect } from 'react';
import { fetchTodos, addTodo, updateTodo, deleteTodo } from '../services/api';
import DataTable from '../components/DataTable/DataTable';
import AddItemForm from '../components/AddItemForm/AddItemForm';
import * as Yup from 'yup';

const TodosPage = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const loadTodos = async () => {
      const data = await fetchTodos();
      setTodos(data);
    };
    loadTodos();
  }, []);

  const handleAddTodo = async (newTodo) => {
    const addedTodo = await addTodo(newTodo);
    setTodos([...todos, addedTodo]);
  };

  const handleEditTodo = async (id, updatedTodo) => {
    await updateTodo(id, updatedTodo);
    setTodos(todos.map(todo => todo.id === id ? { ...todo, ...updatedTodo } : todo));
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const todoColumns = [
    { field: 'id', headerName: 'ID' },
    { field: 'userId', headerName: 'User ID' },
    { field: 'title', headerName: 'Title', editable: true },
    { field: 'completed', headerName: 'Completed', editable: true, type: 'checkbox' },
    { field: 'actions', headerName: 'Actions' },
  ];

  const initialTodoValues = {
    userId: '',
    title: '',
    completed: false,
  };

  const todoValidationSchema = Yup.object().shape({
    userId: Yup.number().required('User ID is required').positive().integer(),
    title: Yup.string().required('Title is required').max(100),
    completed: Yup.boolean(),
  });

  return (
    <div className="page-container">
      <h1>Разработка</h1>
      <DataTable
        data={todos}
        columns={todoColumns}
        onEdit={handleEditTodo}
        onDelete={handleDeleteTodo}
        onAdd={handleAddTodo}
        AddFormComponent={AddItemForm}
        initialFormValues={initialTodoValues}
        validationSchema={todoValidationSchema}
      />
    </div>
  );
};

export default TodosPage;