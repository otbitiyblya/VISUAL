import React, { useState, useEffect } from 'react';
import { fetchUsers, addUser, updateUser, deleteUser } from '../services/api';
import DataTable from '../components/DataTable/DataTable';
import AddItemForm from '../components/AddItemForm/AddItemForm';
import * as Yup from 'yup';

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const data = await fetchUsers();
      setUsers(data);
    };
    loadUsers();
  }, []);

  const handleAddUser = async (newUser) => {
    const addedUser = await addUser(newUser);
    setUsers([...users, addedUser]);
  };

  const handleEditUser = async (id, updatedUser) => {
    await updateUser(id, updatedUser);
    setUsers(users.map(user => user.id === id ? { ...user, ...updatedUser } : user));
  };

  const handleDeleteUser = async (id) => {
    await deleteUser(id);
    setUsers(users.filter(user => user.id !== id));
  };

  const userColumns = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name', editable: true },
    { field: 'username', headerName: 'Username', editable: true },
    { field: 'email', headerName: 'Email', editable: true },
    { field: 'phone', headerName: 'Phone', editable: true },
    { field: 'website', headerName: 'Website', editable: true },
    { field: 'actions', headerName: 'Actions' },
  ];

  const initialUserValues = {
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: {
        lat: '',
        lng: '',
      },
    },
    company: {
      name: '',
      catchPhrase: '',
      bs: '',
    },
  };

  const userValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').max(50),
    username: Yup.string().required('Username is required').max(30),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().matches(/^[0-9-]+$/, 'Phone number is not valid'),
    website: Yup.string().url('Invalid URL'),
  });

  return (
    <div className="page-container">
      <h1>Пользователи</h1>
      <DataTable
        data={users}
        columns={userColumns}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        onAdd={handleAddUser}
        AddFormComponent={AddItemForm}
        initialFormValues={initialUserValues}
        validationSchema={userValidationSchema}
      />
    </div>
  );
};

export default UsersPage;