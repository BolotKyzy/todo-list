import React, {useState } from 'react';
import Menu from './components/Menu';
import listSvg from './assets/img/listSvg.svg';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';

import AddButtonList from './components/AddButtonList';
// import DB from './assets/db.json';
import Tasks from './components/Tasks';
import axios from 'axios';
import { fetchData, removeCategory } from './actions';

function App({allLists, fetchData}) {
  // const listFromState = useSelector(state => ([...state.lists]));
  // console.log(listFromState);

  const [lists, setLists] = useState();
  const [activeItem, setActiveItem] = useState();
  const location = useLocation();
  const navigate = useNavigate();

  
  React.useEffect (() => {
  axios.get("http://localhost:3002/lists?_embed=tasks").then(({data}) => {
      setLists(data);
    })
    // fetchData();
    // setLists(listFromState);


  },[]);


  React.useEffect(() => {
    const listId = location.pathname.split('/lists/')[1];
    if(lists) {
      const list = lists.find(list => list.id == listId);
      setActiveItem(list);
    }

  }, [lists, location.pathname])
  
  const onAddList = (obj) => {
    const newList = [
      ...lists, 
      obj
    ];
    setLists(newList);
  }

  const onAddTask = (listId, taskObj) => {
     const newList = lists.map(item => {
      if (item.id === listId) {
        item.tasks = [...item.tasks, taskObj];
      }
      return item;
    });


    setLists(newList);
  }

  const onRemoveTask = (listId, task) => {
    if(window.confirm("Do you really want to delete this task?")) {
      const newList = lists.map(list => {
        if(list.id === listId) {
          // list.tasks = [...list.tasks, taskObj];
          const newTasks = list.tasks.filter(t => t.id !== task.id);
          list.tasks = newTasks;
        }
        return list;
       } )
  
      setLists(newList);
    
  
      axios
      .delete("http://localhost:3002/tasks/"+task.id).catch(() => {
          alert("Не удалось удалить задачу!");
      });
  }
  }


const onRemoveCategory = (obj) => {
  setLists(obj);  
  
}
const editTheTitle = (id, title) => {
  let newList  = lists.map(list => {
    if(list.id === id)  {
      list.name = title
    }
    return list;
  })
  setLists(newList);

}
const onEditTask = (listId, taskObj) => {

  const newTaskText = window.prompt("Text of tasks", taskObj.text);

  if(!newTaskText) {
    return;
  }

  const newList = lists.map(list => {
    if (list.id === listId) {
      list.tasks = list.tasks.map(task => {
        if (task.id === taskObj.id) {
          task.text = newTaskText;
        }
        return task;
      });
    }
    return list;
  });
  setLists(newList);
  axios
    .patch('http://localhost:3002/tasks/' + taskObj.id, {
      text: newTaskText
    })
    .catch(() => {
      alert('Не удалось обновить задачу');
    });
}

const onCompleteTask = (listId, taskId, isCompleted) => {

  const newList = lists.map(list => {
    if (list.id === listId) {
      list.tasks = list.tasks.map(task => {
        if (task.id === taskId) {
          task.completed = isCompleted;
        }
        return task;
      });
    }
    return list;
  });
  setLists(newList);
  axios
    .patch('http://localhost:3002/tasks/' + taskId, {
      completed: isCompleted
    })
    .catch(() => {
      alert('Не удалось обновить задачу');
    });

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
        onRemove={onRemoveCategory}
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

const mapStateToProps = (state) => {
  return {
    allLists: state.lists,
    tasks: state.tasks
  }

}
const mapDispatchToProps =  (dispatch) => {
  return {
    fetchData: () => dispatch(fetchData())
    // removeCategory: (obj)=> dispatch(removeCategory(obj))
  
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
