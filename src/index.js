import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './reducers/redux-store';
import './index.scss';
import App from './App';

// const playList = (state = [], action) => {
//   if(action.type === 'ADD_CATEGORY') {
//     return [
//       ...state, 
//       action.payload
//     ];
//   }

//   return state;
// };
// const store  = createStore(playList);
// console.log(store.getState());


ReactDOM.render(
  <Provider store = {store}>
    <Router>
      <App/>
    </Router>
  </Provider>,
  
  document.getElementById('root')
);

