import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ title, percentage, onCancel }) => {
    return (
        <div className="progress-bar-container">
            <h3>{title}</h3>
            <div className="progress-bar">
                <div
                    className="progress-bar-fill"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
            <div>{percentage < 100 ? `${percentage}%` : 'Завершено'}</div>
            <button onClick={onCancel}>Отменить</button>
        </div>
    );
};

export default ProgressBar;