import React, { useState, useEffect } from 'react';
import { fetchPosts, addPost, updatePost, deletePost } from '../services/api';
import DataTable from '../components/DataTable/DataTable';
import AddItemForm from '../components/AddItemForm/AddItemForm';
import * as Yup from 'yup';

const PostsPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      const data = await fetchPosts();
      setPosts(data);
    };
    loadPosts();
  }, []);

  const handleAddPost = async (newPost) => {
    const addedPost = await addPost(newPost);
    setPosts([...posts, addedPost]);
  };

  const handleEditPost = async (id, updatedPost) => {
    await updatePost(id, updatedPost);
    setPosts(posts.map(post => post.id === id ? { ...post, ...updatedPost } : post));
  };

  const handleDeletePost = async (id) => {
    await deletePost(id);
    setPosts(posts.filter(post => post.id !== id));
  };

  const postColumns = [
    { field: 'id', headerName: 'ID' },
    { field: 'userId', headerName: 'User ID' },
    { field: 'title', headerName: 'Title', editable: true },
    { field: 'body', headerName: 'Body', editable: true },
    { field: 'actions', headerName: 'Actions' },
  ];

  const initialPostValues = {
    userId: '',
    title: '',
    body: '',
  };

  const postValidationSchema = Yup.object().shape({
    userId: Yup.number().required('User ID is required').positive().integer(),
    title: Yup.string().required('Title is required').max(100),
    body: Yup.string().required('Body is required').max(500),
  });

  return (
    <div className="page-container">
      <h1>Лента</h1>
      <DataTable
        data={posts}
        columns={postColumns}
        onEdit={handleEditPost}
        onDelete={handleDeletePost}
        onAdd={handleAddPost}
        AddFormComponent={AddItemForm}
        initialFormValues={initialPostValues}
        validationSchema={postValidationSchema}
      />
    </div>
  );
};

export default PostsPage;