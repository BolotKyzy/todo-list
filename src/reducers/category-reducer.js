import axios from "axios";

const initialState =  []

const deleteList = (items,obj) => {
     const newList = items.filter(item => item.id !== obj.id);
     return newList;

}
const CategoryReducer = (state = initialState, action ) => {
    switch(action.type) {
        case 'FETCH_DATA':
            state = [...state, ...action.payload];
            return state;
        case 'REMOVE_CATEGORY':
            return  deleteList(state, action.payload);
        case 'ADD_NEW_CATEGORY':
            return  [...state, action.payload];
        case 'ADD_NEW_TASK':
            const newList = state.map(item => {
            if (item.id === action.payload[0]) {
                item.tasks = [...item.tasks, action.payload[1]];
            }
            return item;
            });
            return newList;
        case 'DELETE_THE_TASK' :
            const deletedList = state.map(list => {
                if(list.id === action.payload[0]) {
                    const newTasks = list.tasks.filter(t => t.id !== action.payload[1].id);
                    list.tasks = newTasks;
                }
                return list;
            } )
            return deletedList;
        case 'EDIT_TITLE':
            let editedList  = state.map(list => {
                if(list.id === action.payload[0])  {
                    list.name = action.payload[1]
                }
                return list;
            })
            return editedList;
        case 'EDIT_TASK':

            const newTaskText = window.prompt("Text of tasks", action.payload[1].text);
            axios
                .patch('http://localhost:3002/tasks/' + action.payload[1].id, {
                    text: newTaskText
                })
                .catch(() => {
                    alert('Не удалось обновить задачу');
                });
            if(!newTaskText) {
                return;
            }
            const newEditList = state.map(list => {
                if (list.id === action.payload[0]) {
                    list.tasks = list.tasks.map(task => {
                        if (task.id === action.payload[1].id) {
                            task.text = newTaskText;
                        }
                        return task;
                    });
                }
                return list;
            });
            return newEditList;
        case 'TO_COMPLETE_TASK':
            const newCompList = state.map(list => {
                if (list.id === action.payload[0]) {
                    list.tasks = list.tasks.map(task => {
                        if (task.id === action.payload[1]) {
                            task.completed = action.payload[2];
                        }
                        return task;
                    });
                }
                return list;
            });
            axios
                .patch('http://localhost:3002/tasks/' + action.payload[1], {
                    completed: action.payload[2]
                })
                .catch(() => {
                    alert('Не удалось обновить задачу');
                });
            return newCompList;

        default:
            return state; 
    }

}

export default CategoryReducer;