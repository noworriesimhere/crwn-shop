import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'; // reducer needs to be persisted as well as store
import storage from 'redux-persist/lib/storage'; // we'll get the actual localStorage object on our window browser
//the above is telling redux-persist that I want to use localStorage as my default storage
//alternatively I could use sessionStorage from 'redux-persist/...*somehwereelse*

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

const persistConfig = {
  key: 'root', //at what point inside our reducer object do we want to start storing everthing? from root
  storage,
  whitelist: ['cart'],
  //above should contain string names of any reducer we wanna store
};
//above represents the possible configs for redux-persist to use

const rootReducer = combineReducers({
  user: userReducer, //no reason to persist this, firebase is caring for this
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer,
});

export default persistReducer(persistConfig, rootReducer);
//a modified version of our rootReducer with persistence capabilities
