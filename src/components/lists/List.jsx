import React, { useEffect, useState } from 'react';
import axios from 'axios';
import url from '../../BackendURL';
import style from './List.module.scss';
import ListItem from './ListItem';

function List(props) {
    const [list, setList] = useState({});
    const [listTitle, setListTitle] = useState('Meine neue Liste');
    const [listItems, setListItems] = useState([]);

    useEffect(() => {
        if (!props.new) {
            setList(props.list);
            setListTitle(props.list.title);
        }
    }, [props.list]);

    useEffect(() => {
        getListItems();
    }, [list]);

    /**
     * creates a new list
     */
    const createNewList = async () => {
        await axios.post(url + '/api/lists',
            {
                title: listTitle
            },
            { headers: { 'Content-Type': 'application/json' } }).then(res => {
                console.log(res);
                props.update();
            });
    }

    /**
     * updates the title of the list
     */
    const updateListTitle = async () => {
        await axios.put(url + '/api/lists/' + list.id,
            {
                title: listTitle
            },
            { headers: { 'Content-Type': 'application/json' } }).then(res => {
                console.log(res);
                props.update();
            });
    }

    /**
     * gets all todo items for the list from db
     */
    const getListItems = () => {
        axios.get(url + '/api/lists/' + list.id + '/todos').then(res => {
            setListItems(res.data);
        })
    }

    /**
   * deletes a todo item from the list by its id
   */
    const deleteListItem = async (todo) => {
        await axios.delete(url + '/api/lists/' + todo.list_id + '/todos/' + todo.id)
            .then((res) => {
                console.log(res.data);
                getListItems();
            });
    }

    /**
     * creates a new todo item
     */
    const createNewListItem = async () => {
        await axios.post(url + '/api/lists/' + list.id + '/todos',
            {
                text: 'New Todo'
            },
            { headers: { 'Content-Type': 'application/json' } }).then(res => {
                console.log(res);
                getListItems();
            });
    }

    return (
        props.new ?
            <div className={style.newList_wrapper}>
                <section className={style.list_title_wrapper}>
                    <input className={style.list_title}
                        type='text'
                        value={listTitle}
                        onChange={(e) => setListTitle(e.target.value)} />
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
                        value={listTitle}
                        onChange={(e) => setListTitle(e.target.value)}
                        onBlur={updateListTitle} />

                    <button type='button' onClick={() => props.delete(list)}>
                        <span className="material-symbols-rounded">
                            delete
                        </span>
                    </button>
                </section>

                <section className={style.list_item_wrapper}>
                    {listItems.map((item, key) => {
                        return <ListItem todo={item} key={key} delete={deleteListItem} update={getListItems} />
                    })}
                </section>

                <section className={style.list_bottom_wrapper}>
                    <i onClick={createNewListItem} className="material-symbols-rounded">
                        add
                    </i>
                </section>
            </div>
    )
}

export default List
