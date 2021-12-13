import React from 'react'
import editSvg from '../../assets/img/edit.svg';
import { Link } from 'react-router-dom';


import './Tasks.scss';
import axios  from 'axios';
import AddTaskForm from './AddTaskForm';
import Task from './Task';

 const Tasks = ({list, onEditTitle, onAddTask, withoutEmpty, onRemoveTask, onEditTask, onCompleteTask}) => {
    
    const  editTitle = () => {
        const newTitle = window.prompt("Name of category", list.name);
        if(newTitle) {
            onEditTitle(list.id, newTitle);
            axios
            .patch("http://localhost:3002/lists/"+list.id, {
                name: newTitle
            }).catch(() => {
                alert("Не удалось обновить название списка!");
            });
        }
    }


    return (
            <div className='tasks'>
            <div className="tasks-header">
          <Link to = {`/lists/${list.id}`}>
          <h2>{list.name}
          <img onClick={() => editTitle() } src={editSvg} alt="Edit" />
          </h2></Link>
        </div>
        <div className="tasks-items">
            {!withoutEmpty && list.tasks && !list.tasks.length && <h1>No tasks</h1>}
            {
               list.tasks && list.tasks.map(task => <Task list = {list} task = {task} onRemove = {onRemoveTask} onEdit={onEditTask} onCompleteTask = {onCompleteTask}/>)
            }
            <AddTaskForm key = {list.id} list = {list} onAddTask = {onAddTask} />
        </div>
      </div>    
      )
}
export default Tasks;