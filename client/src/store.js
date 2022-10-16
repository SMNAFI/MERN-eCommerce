import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { productListReducer } from './reducers/productReducers'

// as we have multiple reducer
// productList acts a state
const reducer = combineReducers({
  productList: productListReducer,
})
const initialState = {}
// if we have multiple middleware
const middleware = [thunk]

// createStore(reducer, initialState, middleware)
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
