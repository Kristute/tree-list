import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore, compose } from 'redux';
import Thunk from 'redux-thunk';
import listReducer from './reducer';
import * as serviceWorker from './serviceWorker';
import List from "./components/App";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    listReducer,
    composeEnhancers(
        applyMiddleware(Thunk),
));

render(
    <Provider store={store}>
        <List />
    </Provider>,
    document.getElementById("root")
);

serviceWorker.unregister();