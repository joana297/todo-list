import React, { useEffect, useState } from 'react';
import style from './Menu.module.scss';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';

function Menu(props) {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    getAllLists();
  }, []);

  /**
   * gets all lists from db
   */
  const getAllLists = () => {
    axios.get('http://localhost:8080/api/lists').then((res) => {
      setLists(res.data);
    });
  }

  return (
    <section className={style.menu_wrapper + ' ' + (props.menuOpen ? style.open : '')}>
      <nav>
        <div className={style.menu_header}>
          <h2>My Lists</h2>
          <i className={'material-symbols-rounded ' + style.icon} onClick={() => props.toggle()}>
            close
          </i>
        </div>
        <menu>
          {lists.map((list, key) => {
            return (
              <li>
                {list.title}
              </li>
            )
          })}
        </menu>
      </nav>
    </section>
  )
}

export default Menu;
