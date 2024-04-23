import React, { useState, useEffect } from 'react';
import style from './ListItem.module.scss';
import Notification from './Notification';
import axios from 'axios';

function ListItem(props) {
  const [todoText, setTodoText] = useState("");
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getNotifications();
  }, []);

  useEffect(() => {
    setTodoText(props.todo.text);
  }, [props.todo]);

  const updateTodoText = async (e) => {
    await axios.patch('http://localhost:8080/api/lists/' + props.todo.list_id + '/todos/' + props.todo.id,
      {
        text: e.target.value
      },
      { headers: { 'Content-Type': 'application/json' } }).then((res) => {
        console.log(res.data);
      });
  }

  const getNotifications = () => {
    axios.get('http://localhost:8080/api/lists/' + props.todo.list_id + '/todos/' + props.todo.id + '/notifications').then((res) => {
      setNotifications(res.data);
    });
  }

  const addNotification = async() => {
    await axios.post('http://localhost:8080/api/lists/' + props.todo.list_id + '/todos/' + props.todo.id + '/notifications',
      {
        date_time: "My new notification"
      },
      { headers: { 'Content-Type': 'application/json' } }).then(res => {
        getNotifications();
      });
  }

  const deleteNotification = async (id) => {
    await axios.delete('http://localhost:8080/api/lists/' + props.todo.list_id + '/todos/' + props.todo.id + '/notifications/' + id).then((res) => {
      console.log(res.data);
    }).then(res => {
      getNotifications();
    });
  }

  return (
    <section className={style.list_item_wrapper}>
      <section className={style.list_item}>
        <input type='checkbox' />

        <div className={style.title}>
          <input type='text' 
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          onBlur={updateTodoText}/>
          <span className={style.line} />
        </div>

        <section className={style.btn_group}>
          <button type='button' className={style.alarm} onClick={addNotification}>
            <span className="material-symbols-rounded">
              alarm
            </span>
          </button>
          <button type='button' onClick={() => props.deleteFct(props.todo.id)}>
            <span className="material-symbols-rounded">
              delete
            </span>
          </button>
        </section>
      </section>
      {notifications.map((item, key) => {
        return <Notification key={key} notification={item} deleteFct={deleteNotification} />
      })}
    </section>

  )
}

export default ListItem
