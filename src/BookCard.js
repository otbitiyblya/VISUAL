import React from 'react';

const BookCard = ({ title, authors, cover }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', margin: '16px', borderRadius: '8px', width: '200px', textAlign: 'center' }}>
      {cover && <img src={cover} alt={title} style={{ width: '100%', height: 'auto', marginBottom: '16px' }} />}
      <h3 style={{ fontSize: '18px', margin: '8px 0' }}>{title}</h3>
      <p style={{ fontSize: '14px', color: '#666' }}>{authors.join(', ')}</p>
    </div>
  );
};

export default BookCard;