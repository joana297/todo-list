import React, { useEffect, useState } from 'react';
import style from './ListWrapper.module.scss';
import ListItem from './ListItem';
import axios from 'axios';
import url from '../../BackendURL';

function ListWrapper(props) {
  const [listTitle, setListTitle] = useState("");
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    getListItems();
  }, [props.notifications]);

  useEffect(() => {
    setListTitle(props.list.title);
  }, [props.list]);

  const updateListTitle = async (e) => {
    await axios.patch(url + '/api/lists/' + props.list.id,
      {
        title: e.target.value
      },
      { headers: { 'Content-Type': 'application/json' } }).then((res) => {
        console.log(res.data);
      });
  }

  const getListItems = () => {
    axios.get(url + '/api/lists/' + props.list.id + '/todos').then((res) => {
      setListItems(res.data);
    });
  }

  const addListItem = async () => {
    await axios.post(url + '/api/lists/' + props.list.id + '/todos',
      {
        text: "My new Todo"
      },
      { headers: { 'Content-Type': 'application/json' } }).then(res => {
        getListItems();
      });
  }

  const deleteListItem = async (id) => {
    await axios.delete(url + '/api/lists/' + props.list.id + '/todos/' + id).then((res) => {
      console.log(res.data);
    }).then(res => {
      getListItems();
    });
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

          <button type='button' onClick={() => props.deleteFct(props.list.id)}>
            <span className="material-symbols-rounded">
              delete
            </span>
          </button>
        </section>

        <section className={style.list_item_wrapper}>
          {listItems.map((item, key) => {
            return <ListItem key={key} todo={item} deleteFct={deleteListItem} />
          })}
        </section>

        <section className={style.list_bottom_wrapper}>
          <i onClick={addListItem} className="material-symbols-rounded">
            add
          </i>
        </section>
      </section>
  )
}

export default ListWrapper
