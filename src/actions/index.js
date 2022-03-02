import axios from "axios";

const fetchData = () => dispatch => {
     axios.get("http://localhost:3002/lists?_embed=tasks")
        .then(res => {
            console.log(res.data);
            dispatch(getData(res.data))
        })
}
const getData = (items) => ({
    type: 'FETCH_DATA',
    payload: items
})
const removeCategory = obj =>  {
    if(window.confirm("Are you really want to delete this category? ")) {
         axios.delete("http://localhost:3002/lists/"+obj.id)
        return  {
            type: 'REMOVE_CATEGORY',
            payload: obj
        }
    }
}
const addCategory = (obj) => {
    return {
        type: 'ADD_NEW_CATEGORY',
        payload: obj

    }
}
const addTask = (obj) => {
    return {
        type: 'ADD_NEW_TASK',
        payload: obj

    }
}
const deleteTask = (obj) => {
    if(window.confirm("Do you really want to delete this task?")) {
        axios
            .delete("http://localhost:3002/tasks/"+obj[1].id).catch(() => {
            alert("Не удалось удалить задачу!");
        });
        return {
            type: 'DELETE_THE_TASK',
            payload: obj
        }
    }
}
const editTitle = (obj) => {
    return {
        type: 'EDIT_TITLE',
        payload: obj
    }
}
const editTask = (obj) => {
    return {
        type: 'EDIT_TASK',
        payload: obj
    }
}
const completeTask = (obj) => {
    return {
        type: 'TO_COMPLETE_TASK',
        payload: obj
    }
}

export {
    fetchData,
    getData,
    removeCategory,
    addCategory,
    addTask,
    deleteTask,
    editTitle,
    editTask,
    completeTask
    // addData, 
    // addedToFavoriteList
};