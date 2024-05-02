import React from 'react';
import NotificationMessage from './NotificationMessage';
import style from './NotificationContainer.module.scss';

function NotificationContainer(props) {
    return (
        <>
            <button type='button' onClick={() => props.deleteAll()}>
                <span className="material-symbols-rounded">
                    delete
                </span>
            </button>
            {props.notifications.length == 0 ?
                <p>Sie haben keine aktuellen Benachrichtigungen</p> :
                props.notifications.map((item, key) => {
                    return (
                        <NotificationMessage key={key} notification={item} />
                    )
                })}
        </>
    )
}

export default NotificationContainer
