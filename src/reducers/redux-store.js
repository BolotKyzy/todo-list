// import { createStore } from "redux";
// import CategoryReducer from "./category-reducer";
// import TasksReducer from "./tasks-reducer";

// const reducer = (state , action) => {
//     return {
//         lists: CategoryReducer(state, action),
//         tasks: TasksReducer(state, action)
//     }

// };

// let store = createStore(reducer);

// export default store;

import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import rootReducer from './index'

const initalState = {

}

const middleware = [thunk]

const store = createStore(rootReducer, initalState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;
