import React, { useEffect, useState } from 'react';
import style from './ListContainer.module.scss';
import axios from 'axios';
import url from '../../BackendURL';
import List from './List';
import Swal from 'sweetalert2';

function ListContainer() {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    getLists();
    
    /*const cachedLists = localStorage.getItem('cachedLists'); //Todo
    if (cachedLists) { 
      setLists(JSON.parse(cachedLists));
      setLoading(false);
    }*/
  }, []);

  /**
   * gets all lists from db
   */
  const getLists = () => {
    axios.get(url + '/api/lists').then(res => {
      setLists(res.data.lists);
    })
  }

  /**
   * deletes a list by its id
   */
  const deleteList = async (list) => {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      iconColor: '#ff6a6a',
      title: 'Bist du sicher, dass die gesamte Liste inkl. aller Todos gelöscht werden soll',
      showConfirmButton: true,
      confirmButtonText: 'Ja',
      confirmButtonColor: '#bef983',
      showCancelButton: true,
      cancelButtonText: 'Nein',
      cancelButtonColor: '#ff6a6a',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(url + '/api/lists/' + list.id)
          .then((res) => {
            console.log(res.data);
            getLists();
          });
      }
    });
  }

  return (
    <section className={style.list_container}>
      <div className={style.overflow_container}>
        {lists.map((list, key) => {
          return (
            <List list={list} key={key} delete={deleteList} update={getLists} />
          )
        })}
        <List new update={getLists} />
      </div>
    </section>
  )
}

export default ListContainer;
