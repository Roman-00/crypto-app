import React from 'react';

// -------------------------------------------------- Импортируем компоненты
import { Header } from '../Components/Header/Header';
import { Statistics } from '../Components/Statistics/Statistics';

// -------------------------------------------------- Импортируем подключение к websoocket
import { Ws } from '../services/api';

export const Home = () => {

// -------------------------------------------------- Создаем стейт для хранения данных
    const [data, setData] = React.useState([]);

// -------------------------------------------------- Создаем useRef для обновления данных
    const dataRef = React.useRef([]);

// -------------------------------------------------- Создаем useState для получения данных по клику
    const [isResieve, setIsResieve] = React.useState(false);

// -------------------------------------------------- Создаем useState для пересчета данных
    const [isCalc, setIsCalc] = React.useState(false);

// -------------------------------------------------- Выполняем useEffect для получения данных
    React.useEffect(() => {

// -------------------------------------------------- Создаем функцию которая парсит наши данные в виде JSON
        const messageHandler = (e) => {
            dataRef.current.push(JSON.parse(e.data));
        };

// -------------------------------------------------- Проверяем по условию если isResieve == true то получаем данные
        if (isResieve) {
            Ws.addEventListener('message', messageHandler);
            return;
        }

        return () => {
            Ws.removeEventListener('message', messageHandler);
        };

    }, [isResieve]);

// -------------------------------------------------- Выполняем useEffect для пересчета данных по повторному клику по Статистике

    React.useEffect(() => {

        if (isCalc) {
            setData([...data, ...dataRef.current]);

            dataRef.current = [];
            setIsResieve(true);
            setIsCalc(false);
        }

    }, [data, isCalc]);

// -------------------------------------------------- Создадим функцию handleStart для получения данных
    const handleStart = () => {

        setIsResieve(true);

    };

// -------------------------------------------------- Создадим функцию handleStatus для Статистики
    const handleStatus = () => {

        setIsResieve(false);
        setIsCalc(true);

    };

    return (
        <>
            <Header />
            <section className="interface" id="interface">
                <div className="container">
                    <div className="interface__button">
                        <button className="btn btn__start" onClick={handleStart}>
                            Старт
                        </button>
                        <button className="btn btn__statistics" onClick={handleStatus}>
                            Статистика
                        </button>
                    </div>
                </div>
            </section>
            {data && data.length > 0 &&
                <Statistics data={data}/>
            }
        </>
    );  

};