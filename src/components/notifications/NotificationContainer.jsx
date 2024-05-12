import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import NotificationMessage from './NotificationMessage';
import style from './NotificationContainer.module.scss';
import url from '../../BackendURL';

function NotificationContainer(props) {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setNotifications(props.notifications);
  }, [props.notifications]);


  /**
   * iterates through all expired notifications & deletes them
   */
  const deleteAllNotifications = () => {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      iconColor: '#f98383',
      title: 'Bist du sicher, dass alle Erinnerungen gelöscht werden sollen',
      showConfirmButton: true,
      confirmButtonText: 'Ja',
      confirmButtonColor: '#bef983',
      showCancelButton: true,
      cancelButtonText: 'Nein',
      cancelButtonColor: '#ff6a6a',
    }).then((result) => {
      if (result.isConfirmed) {
        notifications.map(async notification => {
          await axios.delete(url + '/api/lists/' + notification.list_id + '/todos/' + notification.todo_id + '/notifications/' + notification.id)
            .then((res) => {
              console.log(res.data);
              props.update();
            });
        });
      }
    });
  }

  /**
   * deletes an expired notification by its id
   */
  const deleteNotification = async (notification) => {
    await axios.delete(url + '/api/lists/' + notification.list_id + '/todos/' + notification.todo_id + '/notifications/' + notification.id)
      .then((res) => {
        console.log(res.data);
        props.update();
      });
  }

  return (
    <section className={style.notification_container}>
      {notifications.length === 0 ?
        <p>Sie haben keine aktuellen Benachrichtigungen</p>
        : <>
          <button type='button' onClick={deleteAllNotifications}>
            <span className="material-symbols-rounded">
              delete
            </span>
            <span className='text'>
              alle Erinnerungen löschen
            </span>
          </button>
          <section className={style.notifications_wrapper}>
            {notifications.map((item, key) => {
              return (
                <NotificationMessage key={key} notification={item} delete={deleteNotification} />
              )
            })}
          </section>
        </>}
    </section>
  )
}

export default NotificationContainer;
