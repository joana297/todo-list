import React, { useState } from 'react';
import style from './ListItem.module.scss';
import Notification from './Notification';

function ListItem(props) {
  const [notifications, setNotifications] = useState([]);

  const deleteItem = () => {
    props.deleteToDo();
  }

  const addNotification = () => {
    setNotifications([...notifications, 1]);
  }

  const deleteNotification = (key) => {
    setNotifications(notifications.filter((item, index) => index !== key));
  }

  return (
    <section className={style.list_item_wrapper}>
      <section className={style.list_item}>
        <input type='checkbox' />

        <div className={style.title}>
          <input type='text' />
          <span className={style.line} />
        </div>

        <section className={style.btn_group}>
          <button type='button' className={style.alarm} onClick={addNotification}>
            <span className="material-symbols-rounded">
              alarm
            </span>
          </button>
          <button type='button' onClick={deleteItem}>
            <span className="material-symbols-rounded">
              delete
            </span>
          </button>
        </section>
      </section>
      {notifications.map((item, key) => {
        return <Notification deleteItem={() => deleteNotification(key)} />
      })}
    </section>

  )
}

export default ListItem
