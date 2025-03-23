import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from './BookCard';

const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Получение данных о книгах
    axios.get('https://fakeapi.extendsclass.com/books')
      .then(response => {
        const booksData = response.data;
        // Для каждой книги получаем обложку
        const booksWithCovers = booksData.map(book => {
          return axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${book.isbn}`)
            .then(coverResponse => {
              const cover = coverResponse.data.items?.[0]?.volumeInfo?.imageLinks?.thumbnail || null;
              return { ...book, cover };
            })
            .catch(() => {
              return { ...book, cover: null };
            });
        });
        // Ожидаем завершения всех запросов
        Promise.all(booksWithCovers).then(setBooks);
      })
      .catch(error => {
        console.error('Ошибка при загрузке данных:', error);
      });
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {books.map(book => (
        <BookCard
          key={book.id}
          title={book.title}
          authors={book.authors}
          cover={book.cover}
        />
      ))}
    </div>
  );
};

export default App;