import React, { useEffect, useState, useRef } from "react";
import ListWrapper from "./components/lists/ListWrapper";
import axios from 'axios';
import Swal from 'sweetalert2';
import NotificationContainer from "./components/notifications/NotificationContainer";

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
    if ((!event.target.closest('.notification_container')) || event.target.className == 'material-symbols-rounded notify open') {
      setNotificationsOpen(false);
    }
    if (event.target.className == 'material-symbols-rounded notify') {
      setNotificationsOpen(true);
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
      getLists();
    });
  }

  const deleteAllNotifications = () => {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      iconColor: '#f98383',
      title: 'Bist du sicher, dass alle Erinnerungen gelöscht werden sollen',
      showConfirmButton: true,
      confirmButtonText: 'Ja',
      confirmButtonColor: '#bef983',
      showCancelButton: true,
      cancelButtonText: 'Nein',
      cancelButtonColor: '#ff6a6a',
    }).then((result) => {
      if (result.isConfirmed) {
        notifications.map(async notification => {
          await axios.delete('http://localhost:8080/api/lists/' + notification.list_id + '/todos/' + notification.todo_id + '/notifications/' + notification.id)
            .then((res) => {
              console.log(res.data);
              getNotifications();
            });
        });
      }
    });
  }

  return (
    <>
      <header>
        <h1 className='align-center'>My To Do List</h1>
        <i className={"material-symbols-rounded notify" + (notificationsOpen ? " open" : "")} >
          notifications
        </i>
        {notificationsOpen ?
          <section className='notification_container' ref={ref}>
            <NotificationContainer notifications={notifications} deleteAll={deleteAllNotifications} />
          </section>
          : ""}
      </header>
      <main>
        <section className="overflow_container">
          {lists.map((list, key) => {
            return (
              <ListWrapper key={key} list={list} notifications={notifications} deleteFct={deleteList} />
            )
          })}
          <p onClick={addList}>add new list + </p>
          {/*<ListWrapper new addNewList={addNewList} />*/}
        </section>
      </main>
    </>
  );
}