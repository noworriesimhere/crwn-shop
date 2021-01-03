import { all, call } from 'redux-saga/effects';

import { fetchCollectionsStart } from './shop/shop.sagas';
import { userSagas } from './user/user.sagas';

export default function* rootSaga() {
  //all takes an array of sagas
  yield all([call(fetchCollectionsStart), call(userSagas)]);
}
