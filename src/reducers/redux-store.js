import {createStore,compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './index'
const composeEnhansers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    rootReducer,
    composeEnhansers(applyMiddleware(thunk))

);
window.store = store;
export default store;
