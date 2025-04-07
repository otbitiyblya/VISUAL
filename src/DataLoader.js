import React, { useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';
import axios from 'axios';

const DataLoader = () => {
    const [percentage, setPercentage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [cancelled, setCancelled] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        setCancelled(false);

        const totalSteps = 100;
        const intervalTime = 1000;
        const increment = 100 / totalSteps;

        const interval = setInterval(() => {
            setPercentage((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + increment;
            });
        }, intervalTime);
        try {
        await new Promise((resolve) => setTimeout(resolve, 10000));
        const response = await axios.get('https://fakeapi.extendsclass.com/countries');
        setData(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            clearInterval(interval);
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setCancelled(true);
        setLoading(false);
        setPercentage(0);
    };

    useEffect(() => {
        if (loading) {
            fetchData();
        }
    }, [loading]);

    return (
        <div>
            <h1>Загрузка данных</h1>
            {loading && (
                <ProgressBar
                    title="Загрузка..."
                    percentage={cancelled ? 'Cancelled' : percentage}
                    onCancel={handleCancel}
                />
            )}
            {!loading && !cancelled && data.length > 0 && (
                <div>
                    <h2>Данные загружены:</h2>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            )}
            {!loading && cancelled && <div>Загрузка была отменена.</div>}
            {!loading && !cancelled && (
                <button onClick={() => setLoading(true)}>Начать загрузку</button>
            )}
        </div>
    );
};

export default DataLoader;