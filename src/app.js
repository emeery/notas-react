import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import 'normalize.css/normalize.css';

import App from './componentes/App';
import reducers from './reducers';
const tienda = applyMiddleware()(createStore);

const jsx = (
    <Provider 
    store={tienda(reducers)} 
    >
        <App/>
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));

