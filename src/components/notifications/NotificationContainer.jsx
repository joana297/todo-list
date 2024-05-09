import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import NotificationMessage from './NotificationMessage';
import style from './NotificationContainer.module.scss';

function NotificationContainer(props) {

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        setNotifications(props.notifications);
      }, [props.notifications]);
    

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
            props.notifications.map(async notification => {
              await axios.delete('http://localhost:8080/api/lists/' + notification.list_id + '/todos/' + notification.todo_id + '/notifications/' + notification.id)
                .then((res) => {
                  console.log(res.data);
                  props.getNotifications();
                });
            });
          }
        });
      }

    return (
        <section className={style.notification_container}>
            <button type='button' onClick={deleteAllNotifications}>
                <span className="material-symbols-rounded">
                    delete
                </span>
            </button>
            {!notifications ?
                <p>Sie haben keine aktuellen Benachrichtigungen</p> :
                notifications.map((item, key) => {
                    return (
                        <NotificationMessage key={key} notification={item} />
                    )
                })}
        </section>
    )
}

export default NotificationContainer;
