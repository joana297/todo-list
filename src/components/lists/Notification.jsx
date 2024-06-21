import React, { useEffect, useState } from 'react';
import style from './Notification.module.scss';
import axios from 'axios';
import url from '../../BackendURL';

function Notification(props) {
  const [notification, setNotification] = useState({});
  const [datetime, setDatetime] = useState("");

  useEffect(() => {
    setNotification(props.notification);
    setDatetime(props.notification.date_time);
  }, [props.notification]);

  /**
    * updates the text & status of the todo
    */
  const updateNotification = () => {
    axios.put(url + '/api/lists/' + notification.list_id + '/todos/' + notification.todo_id + '/notifications/' + notification.id,
      {
        date_time: datetime
      },
      { headers: { 'Content-Type': 'application/json' } }).then(res => {
        console.log(res);
        props.update();
      });
  }

  return (
    <section className={style.notification_wrapper}>
      <button type='button' onClick={() => props.delete(notification)}>
        <span className="material-symbols-rounded">
          close
        </span>
      </button>

      <input type='datetime-local'
        value={datetime}
        onChange={(e) => setDatetime(e.target.value)}
        onBlur={updateNotification} />
    </section>
  )
}

export default Notification
