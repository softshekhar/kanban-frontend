import React from 'react';

import {TASK_STATUSES} from '../constants';

const Task = props => {
    return (
        <div className="task">
            <div className="task-header">
                <div>{props.task.title}</div>
                <select value={props.task.status} onChange={onStatusChange}>
                    {TASK_STATUSES.map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
            </div>
            <hr/>
            <div className="task-body">{props.task.description}</div>
            <div>
                <button className="button button-remove-task" onClick={onRemoveTask}>
                    - Remove this task
                </button>
            </div>
            <div>
                <button className="button button-update-task" onClick={onUpdateTask}>
                    ± Update this task
                </button>
            </div>
        </div>
    );

    function onStatusChange(e) {
        props.onStatusChange(props.task.id, e.target.value);
    }

    function onRemoveTask(e) {
        if (window.confirm('Are you sure you want to remove this task?')) {
            props.onRemoveTask(props.task.id);
        }
    }

    function onUpdateTask(e) {
        props.onUpdateTask(
            {
                id: props.task.id,
                title: props.task.title,
                description: props.task.description,
                status: props.task.status,
            }
        );
    }
};



export default Task;
