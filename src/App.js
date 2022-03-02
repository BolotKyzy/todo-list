import React, {useState } from 'react';
import Menu from './components/Menu';
import listSvg from './assets/img/listSvg.svg';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import AddButtonList from './components/AddButtonList';
// import DB from './assets/db.json';
import Tasks from './components/Tasks';
import axios from 'axios';
import {
  addCategory,
  addTask,
  completeTask,
  deleteTask,
  editTask,
  editTitle,
  fetchData,
  removeCategory
} from './actions';

function App({}) {
  const dispatch = useDispatch();
  const lists = useSelector(({lists}) => lists);
  const [activeItem, setActiveItem] = useState();
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect (() => {
    dispatch(fetchData());
  },[]);

  React.useEffect(() => {
    const listId = location.pathname.split('/lists/')[1];
    if(lists) {
      const list = lists.find(list => list.id == listId);
      setActiveItem(list);
    }
  }, [lists, location.pathname])
  
  const onAddList = (obj) => {
    dispatch(addCategory(obj))
  }

  const onAddTask = (listId, taskObj) => {
    dispatch(addTask([listId, taskObj]))
  }

  const onRemoveTask = (listId, task) => {
    dispatch(deleteTask([listId, task]));
  }
  const onRemoveCategory = (obj) => {
  dispatch(removeCategory(obj));
  }

  const editTheTitle = (id, title) => {
    dispatch(editTitle([id, title]))
  }

  const onEditTask = (listId, taskObj) => {
    dispatch(editTask([listId, taskObj]));
}

const onCompleteTask = (listId, taskId, isCompleted) => {
    dispatch(completeTask([listId, taskId, isCompleted]))
}

  return (
        <div className="todo">
      <div className="todo__sidebar">
        <Menu
        onClickItem={(i) => {
          navigate(`/`);
          setActiveItem(i);
        }}
         items = { [
          {
            active: !activeItem,
            name: "All tasks",
            img: listSvg, 
            active: true
          }
        ]}/>
        { lists && <Menu 
        onClickItem={(i) => {
          navigate(`/lists/${i.id}`)
        } }
        onRemove={(obj) => onRemoveCategory(obj)}
        items = {lists}
        activeItem = {activeItem}
        isRemovable
        />
          } 
        <AddButtonList
          onClickItem = {(i) => setActiveItem(i)}
          onAddList = {obj => onAddList(obj)}/>
      </div>
      <div className="todo__tasks">
        <Routes>
          <Route exact path = '/' element = {
            lists && lists.map(list =><Tasks 
              key = {list.id}
              list = { list }
              onEditTitle = {editTheTitle}
              onAddTask = {onAddTask}
              onRemoveTask = {onRemoveTask}
              onEditTask = {onEditTask}
              onCompleteTask = {onCompleteTask}
              withoutEmpty
              />
  )
          }/>
          <Route exact path = '/lists/:id' element = {
            lists && activeItem && (
              <Tasks 
              list = { activeItem }
              onEditTitle = {editTheTitle}
              onAddTask = {onAddTask}
              onRemoveTask = {onRemoveTask}
              onEditTask = {onEditTask}
              onCompleteTask = {onCompleteTask}
              />)
          }/>
        </Routes>
      
        </div>
    </div>
  );
}


export default App;
