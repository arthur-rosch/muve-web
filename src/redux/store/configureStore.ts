import { userReducer } from '../reducers'
import storage from 'redux-persist/lib/storage'
import { combineReducers, legacy_createStore as createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  user: userReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer)
const persistor = persistStore(store)

export default { store, persistor }

export type State = ReturnType<typeof rootReducer>
