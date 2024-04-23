import React, { useEffect, useState } from 'react';
import style from './ListWrapper.module.scss';
import ListItem from './ListItem';
import axios from 'axios';

function ListWrapper(props) {
  const [listTitle, setListTitle] = useState("My List");
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    getListItems();
  }, []);

  useEffect(() => {
    setListTitle(props.list.title);
  }, [props.list]);

  const updateListTitle = async (e) => {
    await axios.patch('http://localhost:8080/api/lists/' + props.list.id,
      {
        title: e.target.value
      },
      { headers: { 'Content-Type': 'application/json' } }).then((res) => {
        console.log(res.data);
      });
  }

  const getListItems = () => {
    axios.get('http://localhost:8080/api/lists/' + props.list.id).then((res) => {
      setListItems(res.data);
    });
  }

  



  //kommt noch weg
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
          <input className={style.list_title}
            type='text'
            value={listTitle}
            onChange={(e) => setListTitle(e.target.value)}
            onBlur={updateListTitle} />
          <p onClick={() => props.deleteFct(props.list.id)}>delete list</p>
        </section>

        <section className={style.list_item_wrapper}>
          {listItems.map((item, key) => {
            return <ListItem key={key} item={item} deleteToDo={() => deleteToDo(key)} />
          })}
        </section>

        <section className={style.list_bottom_wrapper}>
          <i onClick={addToDo} className="material-symbols-rounded">
            add
          </i>
        </section>
      </section>
  )
}

export default ListWrapper
