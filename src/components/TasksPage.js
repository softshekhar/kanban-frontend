import React, {Component} from 'react';
import TaskList from './TaskList';

import {TASK_STATUSES} from '../constants';

class TasksPage extends Component {
    constructor(props) {
        super(props);
        console.log('Constructor of TaskPage called');
        this.state = {
            showNewCardForm: false,
            showUpdateCardForm: false,
            title: '',
            description: ''
        };
    }

    onTitleChange = e => {
        console.log('onTitleChange of TaskPage called');
        this.setState({title: e.target.value});
    };

    onDescriptionChange = e => {
        console.log('onDescriptionChange of TaskPage called');
        this.setState({description: e.target.value});
    };

    resetForm() {
        console.log('resetForm of TaskPage called');
        this.setState({
            showNewCardForm: false,
            showUpdateCardForm: false,
            title: '',
            description: ''
        });
    }

    onCreateTask = e => {
        console.log('onCreateTask of TaskPage called');
        e.preventDefault();
        this.props.onCreateTask({
            title: this.state.title,
            description: this.state.description,
        });
        this.resetForm();
    };

    onUpdateTask = e => {
        console.log('onUpdateTask of TaskPage called');
        e.preventDefault();
        this.props.onUpdateTask({
            id: this.state.currentlyEditedTask.id,
            title: this.state.title,
            description: this.state.description,
            status: this.state.currentlyEditedTask.status
        });
        this.resetForm();
    };

    toggleForm = () => {
        console.log('toggleForm of TaskPage called');
        this.setState({showNewCardForm: !this.state.showNewCardForm});
    };

    toggleUpdateForm = (task) => {
        console.log('toggleUpdateForm of TaskPage called');
        console.log(task);
        this.setState(
            {
                showUpdateCardForm: !this.state.showUpdateCardForm,
                currentlyEditedTask: task,
                title: task.title,
                description: task.description
            }
        );
    };

    renderTaskLists() {
        console.log('renderTaskLists of TaskPage called');
        return TASK_STATUSES.map(status => {
            const statusTasks = this.props.tasks.filter(
                task => task.status === status
            );
            return (
                <TaskList
                    key={status}
                    status={status}
                    tasks={statusTasks}
                    onStatusChange={this.props.onStatusChange}
                    onRemoveTask={this.props.onRemoveTask}
                    onUpdateTask={this.toggleUpdateForm}
                />
            );
        });
    }

    render() {
        if (this.props.isLoading) {
            return (
                <div className="tasks-loading">
                    Loading...
                </div>
            );
        }

        return (
            <div className="tasks">
                <div className="tasks-header">
                    <button className="button button-default" onClick={this.toggleForm}>
                        + New task
                    </button>
                </div>
                {this.state.showNewCardForm &&
                <form className="new-task-form" onSubmit={this.onCreateTask}>
                    <input
                        className="full-width-input"
                        onChange={this.onTitleChange}
                        value={this.state.title}
                        type="text"
                        placeholder="title"
                    />
                    <input
                        className="full-width-input"
                        onChange={this.onDescriptionChange}
                        value={this.state.description}
                        type="text"
                        placeholder="description"
                    />
                    <button className="button" type="submit">
                        Save
                    </button>
                </form>}
                {this.state.showUpdateCardForm &&
                <form className="update-task-form" onSubmit={this.onUpdateTask}>
                    <input
                        className="full-width-input"
                        onChange={this.onTitleChange}
                        value={this.state.title}
                        type="text"
                        placeholder="title"
                    />
                    <input
                        className="full-width-input"
                        onChange={this.onDescriptionChange}
                        value={this.state.description}
                        type="text"
                        placeholder="description"
                    />
                    <button className="button" type="submit">
                        Update
                    </button>
                </form>}
                <div className="task-lists">
                    {this.renderTaskLists()}
                </div>
            </div>
        );
    }
}

export default TasksPage;
