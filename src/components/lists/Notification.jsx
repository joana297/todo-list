import React from 'react';
import style from './Notification.module.scss';
import axios from 'axios';

function Notification(props) {
  const updateNotification = async (e) => {
    await axios.patch('http://localhost:8080/api/lists/' + props.todo.list_id + '/todos/' + props.todo.id,
      {
        text: e.target.value
      },
      { headers: { 'Content-Type': 'application/json' } }).then((res) => {
        console.log(res.data);
      });
  }

  return (
    <section className={style.notification_wrapper}>
      <button type='button' onClick={() => props.deleteFct(props.notification.id)}>
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
