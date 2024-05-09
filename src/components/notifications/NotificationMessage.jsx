import React, { useEffect, useState } from 'react';
import style from './NotificationMessage.module.scss';
import axios from 'axios';
import url from '../../BackendURL';

export default function NotificationMessage(props) {

    const [list, setList] = useState({});
    const [todo, setTodo] = useState({});
    const [notification, setNotification] = useState({});

    useEffect(() => {
        axios.get(url + '/api/lists/' + props.notification.list_id).then((res) => {
            setList(res.data[0]);
        });
        axios.get(url + '/api/lists/' + props.notification.list_id + '/todos/' + props.notification.todo_id).then((res) => {
            setTodo(res.data[0]);
        });
        setNotification(props.notification);
    }, [props.notification]);

    return (
        <div className={style.notification_wrapper}>
            <div className={style.infotext}>
                <p>{notification.date_time}</p>
                <h4>To Do: {todo.text}</h4>
                <p>in Liste: {list.title}</p>
            </div>
            <button type='button' onClick={() => props.delete(notification)}>
                <span className="material-symbols-rounded">
                    delete
                </span>
            </button>
        </div>
    )
}
