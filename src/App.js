import React from "react";
import ListWrapper from "./components/ListWrapper";
import ListItem from "./components/ListItem";

export default function App() {
  const addNewList = () => {
    console.log("neue Liste erstellt");
  }

  return (
    <>
      <header>
        <h1 className='align-center'>My To Do List</h1>
        <i className="material-symbols-rounded">
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