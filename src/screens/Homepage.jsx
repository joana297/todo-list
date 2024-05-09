import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ListWrapper from '../components/lists/ListWrapper';
import url from '../BackendURL';


function Homepage() {
  const [lists, setLists] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    getLists();
    getNotifications();

    /*document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };*/
  }, []);

  /*const handleClickOutside = (event) => {
    if ((!event.target.closest('.notification_container')) || event.target.className == 'material-symbols-rounded notify open') {
      setNotificationsOpen(false);
    }
    if (event.target.className == 'material-symbols-rounded notify') {
      setNotificationsOpen(true);
    }
  };*/

  const getLists = () => {
    axios.get(url + '/api/lists').then((res) => {
      setLists(res.data);
    });
  }

  const getNotifications = () => {
    axios.get(url + '/api/notifications').then((res) => {
      setNotifications(res.data);
    });
  }

  const addList = async () => {
    await axios.post(url + '/api/lists',
      {
        title: "My new List"
      },
      { headers: { 'Content-Type': 'application/json' } }).then(res => {
        getLists();
      });
  }

  const deleteList = async (id) => {
    await axios.delete(url + '/api/lists/' + id).then((res) => {
      console.log(res.data);
      getLists();
    });
  }
  return (
    <>
      <h1>My Todo App</h1>
      <section className="overflow_container">
        {lists.map((list, key) => {
          return (
            <ListWrapper key={key} list={list} notifications={notifications} deleteFct={deleteList} />
          )
        })}
        <p onClick={addList}>add new list + </p>
        {/*<ListWrapper new addNewList={addNewList} />*/}
      </section>
    </>
  )
}

export default Homepage
