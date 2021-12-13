import React, {useState} from 'react';
import './Tasks.scss';
import addSvg from '../../assets/img/add.svg';
import axios from 'axios';
const AddTaskForm = ({list, onAddTask}) => {

    const [newTask, setNewTask] = useState(false);
    const [inputValue, setInputValue] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const toggleFormVisible = () => {
        setNewTask(!newTask);
        setInputValue('');

    }
    const addTask = () => {

        const obj = {
            "listId": list.id,
            "text": inputValue,
            "completed": false

        };

        axios.post('http://localhost:3002/tasks', obj).then(({data}) => {
            // console.log(data);
            const listObj = {...data, tasks: [] }

            onAddTask(list.id, listObj);
            toggleFormVisible();   
            setIsLoading(true); 
        }).catch( (e) => {
            alert("Sorry, you cant add new task:(")
            console.log(e);
        } 
        ).finally(() => setIsLoading(false)

        )


    }

    return (
        <div className="tasks__form">
        {newTask ? (
            <div className="tasks__form-block">
            <input 
              value={inputValue}
              className = "field" 
              type = "text" placeholder = " Enter the new task"
              onChange={e => setInputValue(e.target.value)} />
            <div className="buttons">
                <button 
                disabled = {isLoading}
                onClick={addTask}
                 className='field_1'>
                    Add the task
                </button>
                <button className='field field-grey' onClick={toggleFormVisible}>
                    Cancel
                </button>
            </div>

        </div>
        ) : (
            <div className="tasks__form-new" onClick={toggleFormVisible}>
            <img src={addSvg} alt="Add" />
            <span>Add new task</span>
        </div>

        )}
        
    </div>
    

    )

}
export default AddTaskForm;