import React, { useState, useEffect } from 'react';
import SearchAndSort from './SearchAndSort';
import Album from './Album';

const App = () => {
  const [albums, setAlbums] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('id');

  // Загрузка данных с API
  useEffect(() => {
    const fetchAlbums = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/albums');
      const data = await response.json();
      setAlbums(data);
      setFilteredAlbums(data);
    };

    fetchAlbums();
  }, []);

  // Фильтрация и сортировка данных
  useEffect(() => {
    let filtered = albums.filter(album =>
      album.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortBy === 'id') {
      filtered.sort((a, b) => a.id - b.id);
    } else if (sortBy === 'userId') {
      filtered.sort((a, b) => a.userId - b.userId);
    }

    setFilteredAlbums(filtered);
  }, [searchTerm, sortBy, albums]);

  // Обработчик поиска
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Обработчик сортировки
  const handleSort = (criteria) => {
    setSortBy(criteria);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Albums</h1>
      <SearchAndSort onSearch={handleSearch} onSort={handleSort} />
      {filteredAlbums.map(album => (
        <Album key={album.id} album={album} />
      ))}
    </div>
  );
};

export default App;