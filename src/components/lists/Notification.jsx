import React from 'react';
import style from './Notification.module.scss';

function Notification(props) {
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
