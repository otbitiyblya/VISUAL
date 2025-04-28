import React, { useEffect, useState } from 'react';

const DataSet = () => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({ name: '', email: '', body: '' });
    const [editingComment, setEditingComment] = useState(null);

    // юрл
    const API_URL = 'http://localhost:5006/comments';

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = () => {
        fetch(API_URL)
            .then(response => {
                if (!response.ok) throw new Error('Ошибка сети');
                return response.json();
            })
            .then(data => setComments(data))
            .catch(error => console.error('Ошибка загрузки данных:', error));
    };

    const addComment = () => {
        if (!newComment.name || !newComment.email || !newComment.body) {
            alert('Все поля обязательны для заполнения!');
            return;
        }

        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Author: newComment.name,
                Text: newComment.body,
                Email: newComment.email
            }),
        })
        .then(response => {
            if (!response.ok) throw new Error('Ошибка добавления');
            return response.json();
        })
        .then(data => {
            setComments([...comments, data]);
            setNewComment({ name: '', email: '', body: '' });
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Не удалось добавить комментарий');
        });
    };

    const deleteComment = (id) => {
        if (!window.confirm('Вы уверены, что хотите удалить этот комментарий?')) return;

        fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) throw new Error('Ошибка удаления');
            setComments(comments.filter(comment => comment.id !== id));
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Не удалось удалить комментарий');
        });
    };

    const editComment = () => {
        if (!editingComment) return;

        fetch(`${API_URL}/${editingComment.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Author: newComment.name,
                Text: newComment.body,
                Email: newComment.email
            }),
        })
        .then(response => {
            if (!response.ok) throw new Error('Ошибка обновления');
            return response.json();
        })
        .then(data => {
            setComments(comments.map(comment => 
                comment.id === editingComment.id ? data : comment
            ));
            setEditingComment(null);
            setNewComment({ name: '', email: '', body: '' });
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Не удалось обновить комментарий');
        });
    };

    const styles = {
        backgroundColor: 'black',
        color: 'white',
        padding: '20px',
    };

    const inputStyle = {
        margin: '5px',
        padding: '8px',
        width: '200px',
    };

    const buttonStyle = {
        margin: '5px',
        padding: '8px 15px',
        cursor: 'pointer',
    };

    return (
        <div style={styles}>
            <h2>{editingComment ? 'Редактировать комментарий' : 'Добавить новый комментарий'}</h2>
            <div>
                <input
                    style={inputStyle}
                    type="text"
                    placeholder="Имя"
                    value={newComment.name}
                    onChange={e => setNewComment({ ...newComment, name: e.target.value })}
                />
                <input
                    style={inputStyle}
                    type="email"
                    placeholder="Email"
                    value={newComment.email}
                    onChange={e => setNewComment({ ...newComment, email: e.target.value })}
                />
            </div>
            <div>
                <textarea
                    style={{ ...inputStyle, width: '300px', height: '60px' }}
                    placeholder="Текст комментария"
                    value={newComment.body}
                    onChange={e => setNewComment({ ...newComment, body: e.target.value })}
                />
            </div>
            <button 
                style={buttonStyle}
                onClick={editingComment ? editComment : addComment}
            >
                {editingComment ? 'Сохранить изменения' : 'Добавить комментарий'}
            </button>

            {editingComment && (
                <button 
                    style={buttonStyle}
                    onClick={() => {
                        setEditingComment(null);
                        setNewComment({ name: '', email: '', body: '' });
                    }}
                >
                    Отменить редактирование
                </button>
            )}

            <h1>Все комментарии</h1>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid white', padding: '8px' }}>Имя</th>
                            <th style={{ border: '1px solid white', padding: '8px' }}>Email</th>
                            <th style={{ border: '1px solid white', padding: '8px' }}>Текст комментария</th>
                            <th style={{ border: '1px solid white', padding: '8px' }}>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments.map(comment => (
                            <tr key={comment.id}>
                                <td style={{ border: '1px solid white', padding: '8px' }}>{comment.author || comment.name}</td>
                                <td style={{ border: '1px solid white', padding: '8px' }}>{comment.email}</td>
                                <td style={{ border: '1px solid white', padding: '8px' }}>{comment.text || comment.body}</td>
                                <td style={{ border: '1px solid white', padding: '8px' }}>
                                    <button 
                                        style={buttonStyle}
                                        onClick={() => {
                                            setEditingComment(comment);
                                            setNewComment({ 
                                                name: comment.author || comment.name, 
                                                email: comment.email, 
                                                body: comment.text || comment.body 
                                            });
                                        }}
                                    >
                                        Редактировать
                                    </button>
                                    <button 
                                        style={buttonStyle}
                                        onClick={() => deleteComment(comment.id)}
                                    >
                                        Удалить
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DataSet;