import React from 'react';

const Album = ({ album }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '5px' }}>
      <p>UserId: {album.userId}</p>
      <p>Id: {album.id}</p>
      <p>Title: {album.title}</p>
    </div>
  );
};

export default Album;