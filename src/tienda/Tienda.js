import { createStore, combineReducers,  applyMiddleware} from 'redux';
import thunk from 'redux-thunk';  
import ObrasLiterarias from '../reducers/index';
import {composeWithDevTools} from 'redux-devtools-extension';
// reducer general
export default () => {
    const tienda = createStore(
        combineReducers({ 
            libros: ObrasLiterarias
        }),
        composeWithDevTools(
            applyMiddleware(thunk)
        )
    ); return tienda;
};