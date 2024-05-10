import React, { useEffect, useState } from 'react';
import style from './Notification.module.scss';

function Notification(props) {
  const [notification, setNotification] = useState({});
  const [datetime, setDatetime] = useState("");

  useEffect(() => {
    setNotification(props.notification);
    setDatetime(props.notification.datetime);
  }, [props.notification]);
  
  return (
    <section className={style.notification_wrapper}>
      <button type='button' onClick={() => props.delete(notification)}>
            <span className="material-symbols-rounded">
              close
            </span>
          </button>
      <input
        type="datetime-local" />
    </section>
  )
}

export default Notification
