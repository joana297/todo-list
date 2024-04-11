import React from "react";
import ListWrapper from "./components/ListWrapper";
import ListItem from "./components/ListItem";

export default function App() {
  return (
    <div className="App">
      <header>
        <h1 className='align-center'>My To Do List</h1>
        <i class="material-symbols-rounded">
          notifications
        </i>
      </header>
      <section>
        <ListWrapper>
          <ListItem />
        </ListWrapper>
      </section>
    </div>
  );
}