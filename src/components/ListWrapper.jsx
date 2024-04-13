import React, { useEffect, useState } from 'react';
import style from './ListWrapper.module.scss';
import ListItem from './ListItem';

function ListWrapper(props) {
  const [listTitle, setListTitle] = useState("My List");
  const [listItems, setListItems] = useState([1, 2, 3]);

  const changeTitle = (e) => {
    setListTitle(e.target.value);
  }

  const addToDo = () => {
    setListItems([...listItems, 2]);
  }

  const deleteToDo = (key) => {
    setListItems(listItems.filter((item, index) => index !== key));
  }

  return (
    props.new ?
      <section className={style.list_wrapper}>
        <p>Neue Liste anlegen</p>
        <i onClick={props.addNewList} className="material-symbols-rounded">
          add
        </i>
      </section>
      :
      <section className={style.list_wrapper}>
        <section className={style.list_title_wrapper}>
          <input className={style.list_title} type='text' value={listTitle} onChange={changeTitle} />
        </section>

        {listItems.map((item, key) => {
          return <ListItem key={key} deleteToDo={() => deleteToDo(key)} />
        })}

        <section className={style.list_bottom_wrapper}>
          <i onClick={addToDo} className="material-symbols-rounded">
            add
          </i>
        </section>
      </section>
  )
}

export default ListWrapper
