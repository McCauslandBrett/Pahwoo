import {createStore,applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';

const middleware = applyMiddleware(thunkMiddleware)
const store = createStore(reducer,middleware);

export default store;