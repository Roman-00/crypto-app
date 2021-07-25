import React from 'react';

// ---------- Импортируем компоненты
import { Header } from '../Components/Header/Header';
import { Statistics } from '../Components/Statistics/Statistics';

// ---------- Импортируем подключение к websoocket
import { Ws } from '../services/api';

export const Home = () => {

    // --------- Создаем useState для хранения данных
    const [data, setData] = React.useState([]);
    //const [counter, setCounter] = React.useState(0);

    const startButton = React.useRef(null);

    // -------- Получаем данные с websocket и записываем в useState
    const getWs = () => {

        const data = [];

        Ws.addEventListener('message', (e) => {
            data.push(JSON.parse(e.data));
            startButton.current.addEventListener('click', () => {
                setData(data);
                //setCounter(data.length);
            });
        });

    };

    return (
        <>
            <Header />
            <section className="interface" id="interface">
                <div className="container">
                    <div className="interface__button">
                        <button className="btn btn__start" onClick={() => getWs()}>
                            Старт
                        </button>
                        <button 
                            className="btn btn__statistics"
                            ref={(element) => {
                                startButton.current = element;
                            }}>
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