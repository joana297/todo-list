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

  const [allNotifications, setAllNotifications] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [notify, setNotify] = useState(false);

  useEffect(() => {
    getAllNotifications();
    setNotify(notifications.length != 0);
  }, [notificationsOpen]);

  useEffect(() => {
    getAllNotifications();
    setNotify(notifications.length != 0);
    setInterval(() => {
      setCurrentDateTime(new Date());
    }, 10000);
  }, [currentDateTime]);

  /**
    * gets all notifications & puts it in cache
    */
  const getAllNotifications = () => {
    axios.get(url + '/api/notifications')
      .then(res => {
        setAllNotifications(res.data.notifications);
        var data = res.data.notifications.filter(elem => compareAsc(parseISO(elem.date_time), currentDateTime) === -1);
        setNotifications(data);
      })
      .catch(error => {
        console.log(error);
        var allNots = JSON.parse(localStorage.getItem('cachedNotifications'));
        var data = allNots.filter(elem => compareAsc(parseISO(elem.date_time), currentDateTime) === -1);
        setNotifications(data);
      });
  }

  /**
   * displays or hides the notifications container
   */
  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
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
      <h1>My Todo App</h1>
      <i className={'material-symbols-rounded ' + style.icon + (notificationsOpen ? ' ' + style.open : "") + (notify ? ' ' + style.notify : "")} onClick={toggleNotifications}>
        notifications
      </i>
      {notificationsOpen ?
        <NotificationContainer notifications={notifications} update={getAllNotifications} />
        : ""}
      <Menu toggle={toggleMenu} menuOpen={menuOpen} />
    </header>
  )
}

export default Header;