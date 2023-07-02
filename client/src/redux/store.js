import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducer'
import thunkMiddleware from 'redux-thunk'
// applyMiddleware, compose mejoran la store
// extension redux revtools puede ser el compose por eso se agrega
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
//Redux no puede realizar por si solo operaciones asincronas.
//thunkMiddleware puede HACER la request
const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunkMiddleware))
)

export default store
