import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist'; //This allows our browser to cache our store based on some configs
import logger from 'redux-logger';
import thunk from 'redux-thunk'; //thunk is a piece of middleware that allows us to fire functions
import rootReducer from './root-reducer';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

const persistor = persistStore(store); //a persisted version of our store

export { store, persistor };
