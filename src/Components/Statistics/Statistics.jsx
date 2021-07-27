import React from 'react';

// -------------------------------------------------- Импортируем компоненты
import { HTag } from '../HTag/HTag';
import { Table } from '../Table/Table';
import { Span } from '../Span/Span';

// -------------------------------------------------- Импортируем стили
import './statistics.css';

export const Statistics = ({data}) => {

// -------------------------------------------------- Вычисляем среднее арифмитическое
    const totalAverage = data.reduce((sum, el) => (sum + el.value), 0) / data.length;

// -------------------------------------------------- Вычисляем медиану
    // -------------------------------------------------- Сортируем массив по возврастанию
    const dataSort = data.sort((a, b) => (a.value - b.value), 0);

// -------------------------------------------------- Находим значение медианы
    const medianRes = dataSort.length % 2 ? dataSort[parseInt(dataSort.length / 2)].value : (dataSort[dataSort.length / 2].value + dataSort[dataSort.length / 2 - 1].value) / 2;

// --------------------------------------------------Вычисляем Стандартное отклонение
    const sigma = Math.sqrt(data.map(x => Math.pow(x.value - totalAverage,2)).reduce((a, b) => (a + b),0) / data.length);

// -------------------------------------------------- Найдем моду среди значений
    const repetitions = data.reduce((acc, {value}) => {

        if (acc.hasOwnProperty(value)) {
            acc[value] += 1
        } else {
            acc[value] = 1
        }

        return acc;

    }, {});

    const repsValues = Object.entries(repetitions)
        .filter(([_, value]) => value > 1)
        .map(([num]) => num);

// -------------------------------------------------- Выводим время расчета данных

    return (
        <section className="statistics" id="statistics">
            <div className="container">
                <HTag tag="h2" className="title statistics__title">
                    Статистика
                </HTag>

                <div className="table__wrapper">
                    <Table name="среднее">
                        {totalAverage ? totalAverage : 0 }
                    </Table>
                    <Table name="стандартное отклонение">
                        {sigma ? sigma : 0}
                    </Table>
                    <Table name="мода">
                       {repsValues.join(', ')}
                    </Table>
                    <Table name="медиана">
                        {medianRes ? medianRes : 0}
                    </Table>
                </div>

                <div className="statistics__result">
                    <Span className="statistics__result--count">
                        Количество потерянных котировок:&nbsp; 0
                    </Span>
                    <Span className="statistics__result--time">
                        Время расчета: {new Date().toLocaleString()}
                    </Span>
                </div>
            </div>
        </section>
    )

};