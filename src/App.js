import React, { useEffect, useState, useRef } from "react";
import ListWrapper from "./components/ListWrapper";
import axios from 'axios';
import NotificationMessage from "./components/NotificationMessage";

export default function App() {
  const [lists, setLists] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    getLists();
    getNotifications();

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setNotificationsOpen(false);
    }
  };

  const getLists = () => {
    axios.get('http://localhost:8080/api/lists').then((res) => {
      setLists(res.data);
    });
  }

  const getNotifications = () => {
    axios.get('http://localhost:8080/api/notifications').then((res) => {
      setNotifications(res.data);
    });
  }

  const addList = async () => {
    await axios.post('http://localhost:8080/api/lists',
      {
        title: "My new List"
      },
      { headers: { 'Content-Type': 'application/json' } }).then(res => {
        getLists();
      });
  }

  const deleteList = async (id) => {
    await axios.delete('http://localhost:8080/api/lists/' + id).then((res) => {
      console.log(res.data);
    }).then(res => {
      getLists();
    });
  }

  function toggleNotifications() {
    if (notificationsOpen) {
      setNotificationsOpen(false);
    } else {
      getNotifications();
      setNotificationsOpen(true);
    }
  }

  return (
    <>
      <header>
        <h1 className='align-center'>My To Do List</h1>
        <i className={"material-symbols-rounded" + (notificationsOpen ? " open" : " ")} onClick={toggleNotifications} >
          notifications
        </i>
        {notificationsOpen ?
          <section ref={ref} className="notification_container">
            {notifications.length == 0 ?
              <p>Sie haben keine aktuellen Benachrichtigungen</p> :
              notifications.map((item, key) => {
                return (
                  <NotificationMessage key={key} notification={item} />
                )
              })}
          </section> : ""}
      </header>
      <main>
        <section className="overflow_container">
          {lists.map((list, key) => {
            return (
              <ListWrapper key={key} list={list} deleteFct={deleteList} />
            )
          })}
          <p onClick={addList}>add new list + </p>
          {/*<ListWrapper new addNewList={addNewList} />*/}
        </section>
      </main>
    </>
  );
}