import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist'; //This allows our browser to cache our store based on some configs
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

const persistor = persistStore(store); //a persisted version of our store

export { store, persistor };
