import axios from 'axios'
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
} from '../constants/productConstants'

// listProducts is like action creator
export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })

    const res = await axios.get('http://localhost:5000/api/products/')

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: res.data })
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        //   error.response.data.message this will give us error message of the custom error handling middleware
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST })

    const res = await axios.get(`http://localhost:5000/api/products/${id}`)

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: res.data })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        //   error.response.data.message this will give us error message of the custom error handling middleware
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}
