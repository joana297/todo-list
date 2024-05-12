import React, { useEffect, useState } from 'react';
import style from './Header.module.scss';
import NotificationContainer from './notifications/NotificationContainer';
import axios from 'axios';
import url from '../BackendURL';
import { compareAsc, parseISO } from 'date-fns';
import Menu from './menu/Menu';

function Header() {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [notify, setNotify] = useState(false);

  useEffect(() => {
    getNotifications();

    setInterval(() => {
      setCurrentDateTime(new Date());
    }, 10000);

    setNotify(notifications.length != 0);
  }, [notificationsOpen, currentDateTime]);

  /**
   * gets all expired notifications from db
   */
  const getNotifications = () => {
    axios.get(url + '/api/notifications').then((res) => {
      setNotifications(res.data.filter(elem => compareAsc(parseISO(elem.date_time), currentDateTime) === -1));
    });
  }

  /**
   * displays or hides the notifications container
   */
  const toggleNotifications = () => {
    if (notificationsOpen) {
      setNotificationsOpen(false);
    } else {
      setNotificationsOpen(true);
    }
  }

  /**
   * displays or hides the menu
   */
  const toggleMenu = () => {
    if (menuOpen) {
      setMenuOpen(false);
    } else {
      setNotificationsOpen(false);
      setMenuOpen(true);
    }
  }

  return (
    <header>
      <i className={'material-symbols-rounded ' + style.icon} onClick={toggleMenu}>
        menu
      </i>
      <i className={'material-symbols-rounded ' + style.icon + (notificationsOpen ? ' ' + style.open : "") + (notify ? ' ' + style.notify : "")} onClick={toggleNotifications}>
        notifications
      </i>
      {notificationsOpen ?
        <NotificationContainer notifications={notifications} update={getNotifications} />
        : ""}
      <Menu toggle={toggleMenu} menuOpen={menuOpen} />
    </header>
  )
}

export default Header;