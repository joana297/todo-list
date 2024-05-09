import React, { useEffect, useState } from 'react';
import style from './Header.module.scss';
import NotificationContainer from './notifications/NotificationContainer';
import axios from 'axios';
import Menu from './menu/Menu';

function Header() {
  const [notifications, setNotifications] = useState([]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = () => {
    axios.get('http://localhost:8080/api/notifications').then((res) => {
      setNotifications(res.data);
    });
  }

  const toggleNotifications = () => {
    if (notificationsOpen) {
      setNotificationsOpen(false);
    } else {
      setNotificationsOpen(true);
    }
  }

  const toggleMenu = () => {
    if (menuOpen) {
      setMenuOpen(false);
    } else {
      setMenuOpen(true);
    }
  }

  return (
    <header>
      <i className={'material-symbols-rounded ' + style.icon} onClick={toggleMenu}>
        menu
      </i>
      <h1 className='align-center'>My Todo List</h1>
      <i className={'material-symbols-rounded ' + style.icon + (notificationsOpen ? ' ' + style.open : "")} onClick={toggleNotifications}>
        notifications
      </i>
      {notificationsOpen ?
        <NotificationContainer notifications={notifications} getNotifications={getNotifications} />
        : ""}
      {/*menuOpen ?
        <Menu toggle={toggleMenu} menuOpen={menuOpen}/>
      : ""*/}
      <Menu toggle={toggleMenu} menuOpen={menuOpen}/>
    </header>
  )
}

export default Header;