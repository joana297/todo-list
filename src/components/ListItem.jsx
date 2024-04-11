import React from 'react';
import style from './ListItem.module.scss';

function ListItem(props) {

  const deleteItem = () => {
    props.deleteToDo();
  }

  return (
    <section className={style.list_item}>
      <input type='checkbox' />
      <input type='text' />
      <button type='button'>edit</button>
      <button type='button' onClick={deleteItem}>delete</button>
    </section>
  )
}

export default ListItem
