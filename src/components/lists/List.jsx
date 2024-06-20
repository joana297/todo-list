import React, { useEffect, useState } from 'react';
import axios from 'axios';
import url from '../../BackendURL';
import style from './List.module.scss';
import ListItem from './ListItem';
import Swal from 'sweetalert2';
import { createList } from '../../util/listAPI';

function List(props) {
    const [list, setList] = useState({});
    const [listTitle, setListTitle] = useState("My List");

    const [allTodos, setAllTodos] = useState([]);
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        getAllTodos();
        if (!props.new) {
            setList(props.list);
            setListTitle(props.list.title);
        }
    }, []);

    useEffect(() => {
        getTodos();
    }, [list]);

    /**
     * gets all todos & puts it in cache
     */
    const getAllTodos = () => {
        axios.get(url + '/api/todos')
            .then(res => {
                setAllTodos(res.data.todos);
                localStorage.setItem('cachedTodos', JSON.stringify(res.data.todos));
            })
            .catch(error => {
                console.log("An error occured: ", error);
                setAllTodos(JSON.parse(localStorage.getItem('cachedTodos')));
            });
    }

    /**
     * gets all todo items for the list from db or cache
     */
    const getTodos = () => {
        axios.get(url + '/api/lists/' + list.id + '/todos')
            .then(res => {
                setTodos(res.data.todos);
            })
            .catch(error => {
                console.log("An error occured: ", error);
                setTodos(allTodos.filter(t => t.list_id = list.id));
            });
    }

    /**
     * validates if the title is empty
     * @param {} e 
     */
    const validateTitle = (e) => {
        if (e.target.value == null || e.target.value == "") {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                iconColor: '#ff6a6a',
                title: 'Titel der Liste darf nicht leer sein!',
                showConfirmButton: true,
                confirmButtonText: 'Ok',
                confirmButtonColor: '#bef983',
            }).then(() => {
                updateListTitle("My List");
            });
        } else {
            updateListTitle();
        }
    }

    /**
     * updates the title of the list
     */
    const updateListTitle = async (title) => {
        await axios.put(url + '/api/lists/' + list.id,
            {
                title: title ?? listTitle
            }, { headers: { 'Content-Type': 'application/json' } })
            .then(res => {
                console.log(res);
                props.update();
            })
            .catch(error => {
                console.log(error);
                var allLists = JSON.parse(localStorage.getItem('cachedLists'));
                allLists.map(l => {
                    if (l.id == list.id) {
                        l.title = title ?? listTitle
                    }
                });
                localStorage.setItem('cachedLists', JSON.stringify(allLists));
            })
    }

    /**
     * creates a new list
     */
    const createNewList = async () => {
        await axios.post(url + '/api/lists',
            {
                title: listTitle
            }, { headers: { 'Content-Type': 'application/json' } })
            .then(res => {
                console.log(res.data.list);
                props.update();
            }).catch(error => {
                console.log(error);
                var allLists = JSON.parse(localStorage.getItem('cachedLists'));
                var data = { id: allLists[allLists.length - 1].id + 1, title: listTitle }
                allLists.push(data);
                localStorage.setItem('cachedLists', JSON.stringify(allLists));
            })
    }


    /**
     * creates a new todo item
     */
    const createNewTodo = async () => {
        await axios.post(url + '/api/lists/' + list.id + '/todos',
            {
                text: 'New Todo'
            },
            { headers: { 'Content-Type': 'application/json' } })
            .then(res => {
                console.log(res.data.todo);
                allTodos.push(res.data.todo)
                localStorage.setItem('cachedTodos', JSON.stringify(allTodos));
                getTodos();
            }).catch(error => {
                console.log(error);
                var data = { id: allTodos[allTodos.length - 1].id + 1, text: 'New Todo' }
                allTodos.push(data);
                localStorage.setItem('cachedTodos', JSON.stringify(allTodos));
            })
    }

    /**
   * deletes a todo item from the list by its id
   */
    const deleteNewTodo = async (todo) => {
        await axios.delete(url + '/api/lists/' + todo.list_id + '/todos/' + todo.id)
            .then((res) => {
                getTodos();
            })
            .catch(error => {
                console.log(error);
                var remList = allTodos.filter(t => t.id != todo.id);
                localStorage.setItem('cachedTodos', JSON.stringify(remList));
                getTodos();
            });
    }

    return (
        props.new ?
            <div className={style.newList_wrapper}>
                <section className={style.list_title_wrapper}>
                    <input className={style.list_title}
                        type='text'
                        value={listTitle ?? "New Todo List"}
                        onChange={(e) => setListTitle(e.target.value)}
                        required />
                </section>

                <section className={style.list_bottom_wrapper}>
                    <i onClick={createNewList} className="material-symbols-rounded">
                        add
                    </i>
                </section>
            </div> :
            <div className={style.list_wrapper}>
                <section className={style.list_title_wrapper}>
                    <input className={style.list_title}
                        type='text'
                        value={listTitle ?? "Todo List"}
                        onChange={(e) => setListTitle(e.target.value)}
                        onBlur={validateTitle}
                        required />

                    <button type='button' onClick={() => props.delete(list)}>
                        <span className="material-symbols-rounded">
                            delete
                        </span>
                    </button>
                </section>

                <section className={style.list_item_wrapper}>
                    {todos.map((item, key) => {
                        return <ListItem todo={item} key={key} delete={deleteNewTodo} update={getTodos} />
                    })}
                </section>

                <section className={style.list_bottom_wrapper}>
                    <i onClick={createNewTodo} className="material-symbols-rounded">
                        add
                    </i>
                </section>
            </div>
    )
}

export default List
