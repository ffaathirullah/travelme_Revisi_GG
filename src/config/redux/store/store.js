import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from '../reducer';

const createStoreWithMidleWare = applyMiddleware(ReduxThunk)(createStore);

const store = createStoreWithMidleWare(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
