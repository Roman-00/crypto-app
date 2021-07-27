import React from 'react';
// -------------------------------------------------- Импортируем компоненты
import { Img } from '../Img/Img';

// -------------------------------------------------- Импортируем стили для компоненты Header
import './header.css';

// -------------------------------------------------- Импортируем изображения логотипа
import logo from '../../images/logo.svg';

export const Header = () => {

    return (
        <header className="header" id="header">
            <div className="container">
               <div className="header__menu">
                    <a href="/" className="header__logo">
                        <Img src={logo} alt="Логотип"/>
                        App
                    </a>

                    <span className="header__text">
                        Добро пожаловать!!
                    </span>
               </div>
            </div>
        </header>
    );

};