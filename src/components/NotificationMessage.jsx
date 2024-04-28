import React, { useEffect, useState } from 'react';
import style from './NotificationMessage.module.scss';
import axios from 'axios';

export default function NotificationMessage(props) {

    const [list, setList] = useState({});
    const [todo, setTodo] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8080/api/lists/' + props.notification.list_id).then((res) => {
            setList(res.data[0]);
        });
        axios.get('http://localhost:8080/api/lists/' + props.notification.list_id + '/todos/' + props.notification.todo_id).then((res) => {
            setTodo(res.data[0]);
        });
    }, [props.notification]);

    return (
        <div className={style.todo_wrapper}>
            <p>{props.notification.date_time}</p>
            <h4>To Do: {todo.text}</h4>
            <p>in Liste: {list.title}</p>
        </div>
    )
}
