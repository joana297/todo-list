import React, { useEffect, useState } from "react";
import ListWrapper from "./components/ListWrapper";
import axios from 'axios';

export default function App() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    getLists();
  }, []);

  const getLists = () => {
    axios.get('http://localhost:8080/api/lists').then((res) => {
      setLists(res.data);
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



  //kommt noch weg
  function getHello() {
    axios.get('http://localhost:8080/api/lists').then((res) => {
      console.log(res.data);
    });
  }

  return (
    <>
      <header>
        <h1 className='align-center'>My To Do List</h1>
        <i className="material-symbols-rounded" onClick={getHello} >
          notifications
        </i>
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