import React, { useEffect, useState } from 'react';
import NotificationMessage from './NotificationMessage';
import style from './NotificationContainer.module.scss';

function NotificationContainer(props) {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        setNotifications(props.notifications);
    }, [props.notifications]);

    return (
        <>
            <button type='button' onClick={() => props.deleteAll()}>
                <span className="material-symbols-rounded">
                    delete
                </span>
            </button>
            {notifications.length == 0 ?
                <p>Sie haben keine aktuellen Benachrichtigungen</p> :
                notifications.map((item, key) => {
                    return (
                        <NotificationMessage key={key} notification={item} />
                    )
                })}
        </>
    )
}

export default NotificationContainer
