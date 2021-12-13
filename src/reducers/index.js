import { combineReducers } from 'redux'
import CategoryReducer from './category-reducer'
import TasksReducer from './tasks-reducer';

export default combineReducers({
  lists: CategoryReducer
//   tasks: TasksReducer
})
