import React, { useState, useEffect, createContext, useContext } from 'react';
import style from './ListItem.module.scss';
import Notification from './Notification';
import axios from 'axios';
import url from '../../BackendURL';
import { format } from 'date-fns';
import Swal from 'sweetalert2';

export const NotificationContext = createContext(false);

function ListItem(props) {
  const { updateNotifications, setUpdateNotifications } = useContext(NotificationContext);

  const [todo, setTodo] = useState({});
  const [todoText, setTodoText] = useState("");
  const [isDone, setIsDone] = useState(false);

  const [allNotifications, setAllNotifications] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getAllNotifications();
    setTodo(props.todo);
    setTodoText(props.todo.text);
    setIsDone(props.todo.is_done);
  }, [props.todo]);

  useEffect(() => {
    getNotifications();
  }, [todo]);

  useEffect(() => {
    if (updateNotifications) {
      getNotifications();
      setUpdateNotifications(false);
    }
  }, [updateNotifications]);

  /**
    * gets all notifications & puts it in cache
    */
  const getAllNotifications = () => {
    axios.get(url + '/api/notifications')
      .then(res => {
        setAllNotifications(res.data.notifications);
        localStorage.setItem('cachedNotifications', JSON.stringify(res.data.notifications));
      })
      .catch(error => {
        console.log(error);
        setAllNotifications(JSON.parse(localStorage.getItem('cachedNotifications')));
      });
  }

  /**
     * gets all notifications for the todo from db or cache
     */
  const getNotifications = () => {
    axios.get(url + '/api/lists/' + todo.list_id + '/todos/' + todo.id + '/notifications')
      .then(res => {
        setNotifications(res.data.notifications);
      })
      .catch(error => {
        console.log(error);
        setNotifications(allNotifications.filter(n => n.todo_id = todo.id));
      });
  }

  /**
     * validates if the text of the todo is empty
     * @param {} e 
     */
  const validateText = (e) => {
    if (e.target.value == null || e.target.value == "") {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        iconColor: '#ff6a6a',
        title: 'Feld darf nicht leer sein!',
        showConfirmButton: true,
        confirmButtonText: 'Ok',
        confirmButtonColor: '#bef983',
      }).then(() => {
        updateTodo(isDone, "My Todo");
      });
    } else {
      updateTodo(isDone);
    }
  }

  /**
   * toggles if the todo is done or undone
   */
  const toggleDone = (e) => {
    setIsDone(e.target.checked);
    updateTodo(e.target.checked);
  }

  /**
    * updates the text & status of the todo
    */
  const updateTodo = (done, text) => {
    axios.put(url + '/api/lists/' + todo.list_id + '/todos/' + todo.id,
      {
        text: text ?? todoText,
        is_done: done
      }, { headers: { 'Content-Type': 'application/json' } })
      .then(res => {
        console.log(res);
        props.update();
      })
      .catch(error => {
        console.log(error);
        var allTodos = JSON.parse(localStorage.getItem('cachedTodos'));
        var updatedItem = { text: text ?? todoText, is_done: done }
        allTodos.map(item => {
          if (item.id == todo.id) {
            item = updatedItem
          }
        });
        localStorage.setItem('cachedLists', JSON.stringify(allTodos));
      });
  }

  /**
   * creates a new notification for the todo item
   */
  const createNewNotification = () => {
    axios.post(url + '/api/lists/' + todo.list_id + '/todos/' + todo.id + '/notifications',
      {
        date_time: format(new Date(), "yyyy-MM-dd'T'HH:mm")
      }, { headers: { 'Content-Type': 'application/json' } })
      .then(res => {
        console.log(res.data.notification);
        getNotifications();

        allNotifications.push(res.data.notification);
        localStorage.setItem('cachedNotifications', JSON.stringify(allNotifications));
        setUpdateNotifications(true);
      })
      .catch(error => {
        console.log(error);
        var data = {
          id: allNotifications[allNotifications.length - 1].id + 1,
          list_id: todo.list_id,
          todo_id: todo.id,
          date_time: format(new Date(), "yyyy-MM-dd'T'HH:mm")
        }
        allNotifications.push(data);
        localStorage.setItem('cachedNotifications', JSON.stringify(allNotifications));
      });
  }

  /**
  * deletes a notification from the todo item by its id
  */
  const deleteNotification = (notification) => {
    axios.delete(url + '/api/lists/' + notification.list_id + '/todos/' + notification.todo_id + '/notifications/' + notification.id)
      .then((res) => {
        getNotifications();
      })
      .catch(error => {
        console.log(error);
        var remList = allNotifications.filter(n => n.id != notification.id);
        localStorage.setItem('cachedNotifications', JSON.stringify(remList));
        getNotifications();
      });
  }

  return (
    <article className={style.list_item_wrapper}>
      <section className={style.list_item}>
        <input type='checkbox'
          checked={isDone ?? false}
          onChange={toggleDone} />

        <div className={style.title}>
          <input type='text'
            value={todoText ?? "Todo"}
            onChange={(e) => setTodoText(e.target.value)}
            onBlur={validateText} />
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
        return <Notification notification={item} key={key} delete={deleteNotification} update={() => { getNotifications(); setUpdateNotifications(true); }} />
      })}
    </article>
  )
}

export default ListItem
