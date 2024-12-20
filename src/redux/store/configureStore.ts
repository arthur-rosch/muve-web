// @ts-nocheck
import { userReducer } from '../reducers';
import storage from 'redux-persist/lib/storage';
import { modalReducer } from '../reducers/modalReducer';
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers, legacy_createStore as createStore } from 'redux';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  modal: modalReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export default { store, persistor };

export type State = ReturnType<typeof rootReducer>;
