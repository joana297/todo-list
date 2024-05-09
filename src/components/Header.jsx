import React, { useEffect, useState } from 'react';
import style from './Header.module.scss';
import NotificationContainer from './notifications/NotificationContainer';
import axios from 'axios';
import Menu from './menu/Menu';

function Header() {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
      <i className={'material-symbols-rounded ' + style.icon + (notificationsOpen ? ' ' + style.open : "")} onClick={toggleNotifications}>
        notifications
      </i>
      {notificationsOpen ?
        <NotificationContainer />
        : ""}
      <Menu toggle={toggleMenu} menuOpen={menuOpen} />
    </header>
  )
}

export default Header;