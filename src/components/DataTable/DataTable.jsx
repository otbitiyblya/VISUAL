import React, { useState } from 'react';
import './DataTable.css';

const DataTable = ({
  data,
  columns,
  onEdit,
  onDelete,
  onAdd,
  AddFormComponent,
  initialFormValues,
  validationSchema,
}) => {
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);

  const handleEditClick = (item) => {
    setEditingId(item.id);
    setEditFormData(item);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const handleEditSubmit = (id) => {
    onEdit(id, editFormData);
    setEditingId(null);
  };

  const handleCancelClick = () => {
    setEditingId(null);
  };

  return (
    <div className="data-table-container">
      <button onClick={() => setShowAddForm(!showAddForm)} className="add-button">
        {showAddForm ? 'Hide Form' : 'Add New'}
      </button>

      {showAddForm && (
        <AddFormComponent
          onSubmit={onAdd}
          fields={columns
            .filter((col) => col.field !== 'id' && col.field !== 'actions')
            .map((col) => ({
              name: col.field,
              label: col.headerName,
              type: col.type || 'text',
            }))}
          initialValues={initialFormValues}
          validationSchema={validationSchema}
        />
      )}

      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.field}>{column.headerName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {columns.map((column) => {
                if (column.field === 'actions') {
                  return (
                    <td key="actions" className="actions-cell">
                      {editingId === item.id ? (
                        <>
                          <button
                            onClick={() => handleEditSubmit(item.id)}
                            className="save-button"
                          >
                            Сохранить
                          </button>
                          <button onClick={handleCancelClick} className="cancel-button">
                            Отмена
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEditClick(item)}
                            className="edit-button"
                          >
                            Редактировать
                          </button>
                          <button
                            onClick={() => onDelete(item.id)}
                            className="delete-button"
                          >
                            Удалить
                          </button>
                        </>
                      )}
                    </td>
                  );
                }

                if (editingId === item.id && column.editable) {
                  return (
                    <td key={column.field}>
                      <input
                        type={column.type || 'text'}
                        name={column.field}
                        value={editFormData[column.field] || ''}
                        onChange={handleEditFormChange}
                        className="edit-input"
                      />
                    </td>
                  );
                }

                return <td key={column.field}>{item[column.field]}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;