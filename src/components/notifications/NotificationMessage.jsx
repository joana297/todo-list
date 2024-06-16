import React, { useEffect, useState } from 'react';
import style from './NotificationMessage.module.scss';
import axios from 'axios';
import url from '../../BackendURL';
import { format, parseISO } from 'date-fns';
import { useNavigate } from 'react-router';

export default function NotificationMessage(props) {
    const navigate = useNavigate();

    const [list, setList] = useState({});
    const [todo, setTodo] = useState({});
    const [notification, setNotification] = useState({});
    const [formatedDate, setFormatedDate] = useState("");

    useEffect(() => {
        setNotification(props.notification);

        axios.get(url + '/api/lists/' + props.notification.list_id)
            .then((res) => {
                setList(res.data.list[0]);
            })
            .catch(error => {
                console.error('Error fetching the list:', error);
                navigate('/404');
            });

        axios.get(url + '/api/lists/' + props.notification.list_id + '/todos/' + props.notification.todo_id)
            .then((res) => {
                setTodo(res.data.todo[0]);
            })
            .catch(error => {
                console.error('Error fetching the todo:', error);
                navigate('/404');
            });
            
        setFormatedDate(format(parseISO(props.notification.date_time), "dd.MM.yyyy' - 'HH:mm"))
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
