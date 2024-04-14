import React from "react";
import ListWrapper from "./components/ListWrapper";
import axios from 'axios';

export default function App() {
  const addNewList = () => {
    console.log("neue Liste erstellt");
  }

  function getHello() {
    axios.get('http://localhost:8080/hello').then((res) => {
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
        <ListWrapper />
        <ListWrapper new addNewList={addNewList} />
      </main>
    </>
  );
}