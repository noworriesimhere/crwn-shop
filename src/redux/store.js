import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist'; //This allows our browser to cache our store based on some configs
import logger from 'redux-logger';
//import thunk from 'redux-thunk'; //thunk is a piece of middleware that allows us to fire functions
import createSagaMiddleware from 'redux-saga';

import rootReducer from './root-reducer';
import rootSaga from './root-saga';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store); //a persisted version of our store

export { store, persistor };
