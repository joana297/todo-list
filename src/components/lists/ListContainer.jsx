import React, { useEffect, useState } from 'react';
import style from './ListContainer.module.scss';
import axios from 'axios';
import url from '../../BackendURL';
import List from './List';
import Swal from 'sweetalert2';

function ListContainer() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    getLists();
  }, []);

  /**
   * get all lists
   */
  const getLists = () => {
    axios.get(url + '/api/lists')
      .then(res => {
        setLists(res.data.lists);
        localStorage.setItem('cachedLists', JSON.stringify(res.data.lists));
      }).catch(error => {
        console.log(error);
        setLists(JSON.parse(localStorage.getItem('cachedLists')));
      })
  }

  /**
   * deletes a list by its id
   */
  const deleteList = (list) => {
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
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(url + '/api/lists/' + list.id)
          .then((res) => {
            getLists();
          })
          .catch(error => {
            console.log("An error occured: ", error);
            var remList = lists.filter(l => l.id != list.id);
            localStorage.setItem('cachedLists', JSON.stringify(remList));
            getLists();
          });
      }
    });
  }

  return (
    <article className={style.list_container}>
      <section className={style.overflow_container}>
        {lists.map((list, key) => {
          return (
            <List list={list} key={key} delete={deleteList} update={getLists} />
          )
        })}
        <List new update={getLists} />
      </section>
    </article>
  )
}

export default ListContainer;
