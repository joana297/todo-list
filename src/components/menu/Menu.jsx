import React, { useEffect, useState } from 'react';
import style from './Menu.module.scss';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import url from '../../BackendURL';

function Menu(props) {
  const [lists, setLists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllLists();
  }, []);

  /**
   * gets all lists from db
   */
  const getAllLists = () => {
    axios.get(url + '/api/lists').then((res) => {
      setLists(res.data);
    });
  }

  /**
   * navigates to the list detailpage & closes menu
   * @param {*} list 
   */
  const openDetailpage = (list) => {
    navigate('list/' + list.id);
    props.toggle();
  }

  /**
   * navigates to the homepage
   */
  const openHomepage = () => {
    navigate('/');
    props.toggle();
  }

  return (
    <section className={style.menu_wrapper + ' ' + (props.menuOpen ? style.open : '')}>
      <nav>
        <div className={style.menu_header}>
          <h2 onClick={openHomepage}>Home</h2>
          <i className={'material-symbols-rounded ' + style.icon} onClick={() => props.toggle()}>
            close
          </i>
        </div>
        <menu>
          {lists.map((list, key) => {
            return (
              <li onClick={() => openDetailpage(list)}>
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
