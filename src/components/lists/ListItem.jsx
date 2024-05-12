import React, { useState, useEffect } from 'react';
import style from './ListItem.module.scss';
import Notification from './Notification';
import axios from 'axios';
import url from '../../BackendURL';
import { format } from 'date-fns';

function ListItem(props) {
  const [todo, setTodo] = useState({});
  const [todoText, setTodoText] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setTodo(props.todo);
  }, [props.todo]);

  useEffect(() => {
    setTodoText(todo.text);
    setIsDone(todo.is_done);
    getNotifications();
  }, [todo]);

  /**
    * updates the text & status of the todo
    */
  const updateTodo = async (done) => {
    await axios.put(url + '/api/lists/' + todo.list_id + '/todos/' + todo.id,
      {
        text: todoText,
        is_done: (done != null) ? done : isDone
      },
      { headers: { 'Content-Type': 'application/json' } }).then(res => {
        console.log(res);
        props.update();
      });
  }

  /**
   * toggles if the todo is done or undone
   */
  const toggleDone = () => {
    if (isDone) {
      setIsDone(false);
      updateTodo(false);
    } else {
      setIsDone(true);
      updateTodo(true);
    }
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
    await axios.delete(url + '/api/lists/' + notification.list_id + '/todos/' + notification.todo_id + '/notifications/' + notification.id)
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
        date_time: format(new Date(), "yyyy-MM-dd'T'HH:mm")
      },
      { headers: { 'Content-Type': 'application/json' } }).then(res => {
        console.log(res);
        getNotifications();
      });
  }

  return (
    <section className={style.list_item_wrapper}>
      <section className={style.list_item}>
        <input type='checkbox' checked={todo.is_done} onChange={toggleDone} />

        <div className={style.title}>
          <input type='text'
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            onBlur={() => {updateTodo(isDone)}} />
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
        return <Notification notification={item} key={key} delete={deleteNotification} update={getNotifications} />
      })}
    </section>

  )
}

export default ListItem
