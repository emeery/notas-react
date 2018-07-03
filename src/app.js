import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Tienda from './tienda/Tienda';
import App from './componentes/App';

import 'normalize.css/normalize.css';
const tienda = Tienda();

const jsx = (
    <Provider 
    store={tienda} 
    >
        <App/>
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));

