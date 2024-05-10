import React, { useState, useEffect } from 'react';
import style from './ListItem.module.scss';
import Notification from './Notification';
import axios from 'axios';
import url from '../../BackendURL';

function ListItem(props) {
  const [todo, setTodo] = useState({});
  const [todoText, setTodoText] = useState("");
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setTodo(props.todo);
  }, [props.todo]);

  useEffect(() => {
    setTodoText(todo.text);
    getNotifications();
  }, [todo]);

  /**
    * updates the text of the todo
    */
  const updateTodoText = async () => {
    await axios.patch(url + '/api/lists/' + todo.list_id + '/todos/' + todo.id,
      {
        text: todoText
      },
      { headers: { 'Content-Type': 'application/json' } }).then(res => {
        console.log(res);
        props.update();
      });
  }

  /**
     * gets all notifications for the todo item from db
     */
  const getNotifications = () => {
    axios.get(url + '/api/lists/' + todo.list_id + '/todos/' + todo.id + '/notifications').then(res => {
      setNotifications(res.data);
    })
  }

  /**
  * deletes a notification from the todo item by its id
  */
  const deleteNotification = async (notification) => {
    await axios.delete(url + '/api/lists/' + notification.list_id + '/todos/' + notification.todo_id)
      .then((res) => {
        console.log(res.data);
        getNotifications();
      });
  }

  /**
   * creates a new notification for the todo item
   */
  const createNewNotification = async () => {
    await axios.post(url + '/api/lists/' + todo.list_id + '/todos/' + todo.id + '/notifications',
      {
        date_time: 'New Todo'
      },
      { headers: { 'Content-Type': 'application/json' } }).then(res => {
        console.log(res);
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
            onBlur={updateTodoText} />
          <span className={style.line} />
        </div>

        <section className={style.btn_group}>
          <button type='button' className={style.alarm} onClick={createNewNotification}>
            <span className="material-symbols-rounded">
              alarm
            </span>
          </button>
          <button type='button' onClick={() => props.delete(todo)}>
            <span className="material-symbols-rounded">
              delete
            </span>
          </button>
        </section>
      </section>
      {notifications.map((item, key) => {
        return <Notification notification={item} key={key} delete={deleteNotification} />
      })}
    </section>

  )
}

export default ListItem
