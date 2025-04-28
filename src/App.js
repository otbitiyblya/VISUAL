import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import PostsPage from './pages/PostsPage';
import AlbumsPage from './pages/AlbumsPage';
import TodosPage from './pages/TodosPage';
import UsersPage from './pages/UsersPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navigation />
        <div className="content-container">
          <Routes>
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/albums" element={<AlbumsPage />} />
            <Route path="/todos" element={<TodosPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/" element={<PostsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;