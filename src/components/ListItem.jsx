import React from 'react';
import style from './ListItem.module.scss';
import Notification from './Notification';

function ListItem(props) {

  const deleteItem = () => {
    props.deleteToDo();
  }

  const addNotification = () => {

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
      <Notification />
    </section>

  )
}

export default ListItem
