import React from 'react';
import style from './ListItem.module.scss';

function ListItem(props) {

  const deleteItem = () => {
    props.deleteToDo();
  }

  const addNotification = () => {
    
  }

  return (
    <section className={style.list_item_wrapper}>
      <div className={style.list_item}>
        <input type='checkbox' />
        <input type='text' />
        <div className={style.btn_group}>
          <button type='button' onClick={addNotification}>
            <span class="material-symbols-rounded">
              alarm
            </span>
          </button>
          <button type='button' onClick={deleteItem}>
            <span class="material-symbols-rounded">
              delete
            </span>
          </button>
        </div>
      </div>
    </section>

  )
}

export default ListItem
