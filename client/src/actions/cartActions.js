import axios from 'axios'
import { CART_ADD_ITEM } from '../constants/cartConstants'

// getState will give all the state in the store
export const addToCart = (id, qty) => async (dispatch, getState) => {
  // const res = await axios.get(`api/products/${id}`)
  const { data } = await axios.get(`http://localhost:5000/api/products/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  })

  // storing into local storage also
  // we only store string in local storage and getState().cart.cartItems is a json. so first we need to convert it to a string.
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
