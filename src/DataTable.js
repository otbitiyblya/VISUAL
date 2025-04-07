import React, { useState } from 'react';

const DataTable = ({ headers, data, renderRow, renderHeader }) => {
    const [selectedRows, setSelectedRows] = useState([]);

    const handleRowClick = (item, index, event) => {
        if (event.ctrlKey) {
            if (selectedRows.includes(index)) {
                setSelectedRows(selectedRows.filter(row => row !== index));
            } else {
                setSelectedRows([...selectedRows, index]);
            }
        } else {
            setSelectedRows([index]);
        }
    };

    const renderHeaders = () => {
        return headers.map((header, index) => (
            <th key={index}>{renderHeader ? renderHeader(header) : header}</th>
        ));
    };

    const renderRows = () => {
        return data.map((item, index) => (
            <tr
                key={index}
                className={selectedRows.includes(index) ? 'selected' : ''}
                onClick={(event) => handleRowClick(item, index, event)}
            >
                {Object.values(item).map((value, i) => (
                    <td key={i}>{renderRow ? renderRow(value, item) : value}</td>
                ))}
            </tr>
        ));
    };

    return (
        <table>
            <thead>
                <tr>{renderHeaders()}</tr>
            </thead>
            <tbody>{renderRows()}</tbody>
        </table>
    );
};

export default DataTable;