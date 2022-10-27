import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { cartReducer } from './reducers/cartReducers'
import {
  productDetailsReducer,
  productListReducer,
} from './reducers/productReducers'

// as we have multiple reducer
// productList acts a state
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
})

// getting what in our localstorage
// as localstorage store only string, so we parse it to json object again
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

// initialState
const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
  },
}

// if we have multiple middleware
const middleware = [thunk]

// createStore(reducer, initialState, middleware)
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
