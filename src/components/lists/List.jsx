import React, { useEffect, useState } from 'react';
import axios from 'axios';
import url from '../../BackendURL';
import style from './List.module.scss';
import ListItem from './ListItem';

function List(props) {
    const [list, setList] = useState({});
    const [listTitle, setListTitle] = useState("");

    useEffect(() => {
        if (!props.new) {
            setList(props.list);
            setListTitle(props.list.title);
        }
    }, [props.list]);


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
        await axios.patch(url + '/api/lists/' + list.id,
            {
                title: listTitle
            },
            { headers: { 'Content-Type': 'application/json' } }).then(res => {
                console.log(res);
                props.update();
            });
    }

    return (
        props.new ?
            <div className={style.newList_wrapper}>
                <input
                    type='text'
                    value={listTitle}
                    onChange={(e) => setListTitle(e.target.value)} />
                <button type='button' onClick={createNewList}>
                    <span className="material-symbols-rounded">
                        add
                    </span>
                </button>
            </div> :
            <div className={style.list_wrapper}>
                <section className={style.list_title_wrapper}>
                    <input className={style.list_title}
                        type='text'
                        value={listTitle}
                        onChange={(e) => setListTitle(e.target.value)}
                        onBlur={updateListTitle} />

                    <button type='button' onClick={() => props.deleteFct(props.list.id)}>
                        <span className="material-symbols-rounded">
                            delete
                        </span>
                    </button>
                </section>

                <section className={style.list_item_wrapper}>
                    {/*listItems.map((item, key) => {
                        return <ListItem key={key} todo={item} /*deleteFct={deleteListItem} />
                    })*/}
                </section>

                <section className={style.list_bottom_wrapper}>
                    <i /*onClick={addListItem}*/ className="material-symbols-rounded">
                        add
                    </i>
                </section>
            </div>
    )
}

export default List
