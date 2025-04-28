import React, { useState, useEffect } from 'react';
import { fetchAlbums, addAlbum, updateAlbum, deleteAlbum } from '../services/api';
import DataTable from '../components/DataTable/DataTable';
import AddItemForm from '../components/AddItemForm/AddItemForm';
import * as Yup from 'yup';

const AlbumsPage = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const loadAlbums = async () => {
      const data = await fetchAlbums();
      setAlbums(data);
    };
    loadAlbums();
  }, []);

  const handleAddAlbum = async (newAlbum) => {
    const addedAlbum = await addAlbum(newAlbum);
    setAlbums([...albums, addedAlbum]);
  };

  const handleEditAlbum = async (id, updatedAlbum) => {
    await updateAlbum(id, updatedAlbum);
    setAlbums(albums.map(album => album.id === id ? { ...album, ...updatedAlbum } : album));
  };

  const handleDeleteAlbum = async (id) => {
    await deleteAlbum(id);
    setAlbums(albums.filter(album => album.id !== id));
  };

  const albumColumns = [
    { field: 'id', headerName: 'ID' },
    { field: 'userId', headerName: 'User ID' },
    { field: 'title', headerName: 'Title', editable: true },
    { field: 'actions', headerName: 'Actions' },
  ];

  const initialAlbumValues = {
    userId: '',
    title: '',
  };

  const albumValidationSchema = Yup.object().shape({
    userId: Yup.number().required('User ID is required').positive().integer(),
    title: Yup.string().required('Title is required').max(100),
  });

  return (
    <div className="page-container">
      <h1>Альбомы</h1>
      <DataTable
        data={albums}
        columns={albumColumns}
        onEdit={handleEditAlbum}
        onDelete={handleDeleteAlbum}
        onAdd={handleAddAlbum}
        AddFormComponent={AddItemForm}
        initialFormValues={initialAlbumValues}
        validationSchema={albumValidationSchema}
      />
    </div>
  );
};

export default AlbumsPage;