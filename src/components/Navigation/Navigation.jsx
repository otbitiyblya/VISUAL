import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <NavLink to="/posts" activeClassName="active">
            Публикации
          </NavLink>
        </li>
        <li>
          <NavLink to="/albums" activeClassName="active">
            Альбомы
          </NavLink>
        </li>
        <li>
          <NavLink to="/todos" activeClassName="active">
            Разработка
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" activeClassName="active">
            Пользователи
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;