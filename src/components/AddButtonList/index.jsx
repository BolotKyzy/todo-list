import React, {useState} from "react";
import Menu from "../Menu";
import Add from '../../assets/img/add.svg';
import close from '../../assets/img/close.svg';
import axios from "axios";
import './AddButtonList.scss';


const AddButtonList = ({onAddList, onClickItem}) => {

  const [newCategory, setNewCategory] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onClose = () => {
    setInputValue('');  
    setNewCategory(false);

  }

  const addList = () => {
    if(!inputValue) {
      alert("Please, enter the category name!");
    }
    else {
      const newCategory = {id: Math.random(), name: inputValue};
      onAddList({...newCategory, tasks : []});
      setIsLoading(true);
      axios.post("http://localhost:3002/lists", newCategory).then(()=> {
        setIsLoading(false);
        onClose();
      });
    }
  }
    return (
        <div className = "add-list"  >
             <Menu 
             onClickItem 
             onClick = {() => setNewCategory(true)}
              items = {[
            {
              name: "Add the task",
              img: Add, 
              active: true
            }
    
          ]}/>
          { 
            newCategory && <div className = "add-list__form">
                        <img className = "add-list__closeBtn" onClick = {onClose} src = {close} alt = "Close" />
              <input 
              value = {inputValue} 
              onChange = {e => setInputValue(e.target.value)}
              className = "field" 
              type = "text" placeholder = " The name of new category"/>
              <button 
              onClick={addList}
              className = "field_1" >
                {isLoading ? "Adding..." : "Add" }
                </button>
            </div>
          }

      

        </div>
    )
}

export default AddButtonList;