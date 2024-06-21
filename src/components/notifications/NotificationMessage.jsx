import React, { useEffect, useState } from 'react';
import style from './NotificationMessage.module.scss';
import axios from 'axios';
import url from '../../BackendURL';
import { format, parseISO } from 'date-fns';

export default function NotificationMessage(props) {

    const [list, setList] = useState({});
    const [todo, setTodo] = useState({});
    const [notification, setNotification] = useState({});
    const [formatedDate, setFormatedDate] = useState("");

    useEffect(() => {
        setNotification(props.notification);
        setFormatedDate(format(parseISO(props.notification.date_time), "dd.MM.yyyy' - 'HH:mm"));

        axios.get(url + '/api/lists/' + props.notification.list_id)
            .then((res) => {
                setList(res.data.list[0]);
            })
            .catch(error => {
                console.error(error);
                var allLists = JSON.parse(localStorage.getItem('cachedLists'));
                setList(allLists.filter(l => l.id == props.notification.list_id)[0]);
            });

        axios.get(url + '/api/lists/' + props.notification.list_id + '/todos/' + props.notification.todo_id)
            .then((res) => {
                setTodo(res.data.todo[0]);
            })
            .catch(error => {
                console.error('Error fetching the todo:', error);
                var allTodos = JSON.parse(localStorage.getItem('cachedTodos'));
                setList(allTodos.filter(l => l.id == props.notification.todo_id)[0]);
            });
    }, [props.notification]);

    return (
        <div className={style.notification_wrapper}>
            <div className={style.infotext}>
                <p className={style.date}>{formatedDate}</p>
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
