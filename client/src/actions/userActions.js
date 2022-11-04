import axios from 'axios'
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
} from './../constants/userConstants'

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })

    // as we sending data in the headers a content type of application/json
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      'http://localhost:5000/api/users/login',
      { email, password },
      config
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    // as localstorage only store string type data
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        //   error.response.data.message this will give us error message of the custom error handling middleware
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })

    // as we sending data in the headers a content type of application/json
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      'http://localhost:5000/api/users',
      { name, email, password },
      config
    )

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    })

    // also login accordingly
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    // as localstorage only store string type data
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        //   error.response.data.message this will give us error message of the custom error handling middleware
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const getUserDetals = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    // as we sending data in the headers a content type of application/json
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(
      `http://localhost:5000/api/users/${id}`,
      config
    )

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        //   error.response.data.message this will give us error message of the custom error handling middleware
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    // as we sending data in the headers a content type of application/json
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `http://localhost:5000/api/users/profile`,
      user,
      config
    )

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        //   error.response.data.message this will give us error message of the custom error handling middleware
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
}
