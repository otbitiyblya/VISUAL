import React from 'react';
import DataTable from './DataTable';
import './App.css';

const App = () => {
    const headers = ['tut name', 'a tut vosrast', 'nu a zdes gorod'];
    const data = [
        { name: 'Милешко Антон Владимирович.', age: '??', city: 'НСК' },
        { name: 'Юханаев Арсений Эдгарович', age: 20, city: 'Новосиб' },
        { name: 'ноунейм', age: 122, city: 'пусть будет москва' },
    ];

    return (
        <div>
            <h1>что-то неведомое человечеству...</h1>
            <DataTable
                headers={headers}
                data={data}
                renderRow={(value) => value}
                renderHeader={(header) => header}
            />
        </div>
    );
};

export default App;