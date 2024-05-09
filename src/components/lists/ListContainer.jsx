import React, { useEffect, useState } from 'react';
import style from './ListContainer.module.scss';
import axios from 'axios';
import url from '../../BackendURL';
import List from './List';

function ListContainer() {

  const [lists, setLists] = useState([]);

  useEffect(() => {
    getLists();
  }, []);

  /**
   * gets all lists from db
   */
  const getLists = () => {
    axios.get(url + '/api/lists').then(res => {
      setLists(res.data);
    })
  }

  /**
   * deletes a list by its id
   */
  const deleteList = async (list) => {
    await axios.delete(url + '/api/lists/' + list.id)
      .then((res) => {
        console.log(res.data);
        getLists();
      });
  }

  return (
    <section>
      {lists.map((list, key) => {
        return (
          <List list={list} key={key} delete={deleteList} update={getLists} />
        )
      })}
      <List new update={getLists}/>
    </section>
  )
}

export default ListContainer;
