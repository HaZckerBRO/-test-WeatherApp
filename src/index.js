import React from 'react';
import ReactDOM from "react-dom";
import {compose, createStore, applyMiddleware} from "redux";
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {rootReducer} from '@/redux/rootReducer';
import App from "./App";
import {storage} from '@/utils/storage';


const store = createStore(rootReducer, compose(
  applyMiddleware(
    thunk
  ),
));

store.subscribe(() => {
  const reduxState = store.getState();
  storage(reduxState);
});


const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(
  app,
  document.getElementById('root')
);