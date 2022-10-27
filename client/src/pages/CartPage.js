import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from './../actions/cartActions'

const CartPage = () => {
  const { id } = useParams()
  const location = useLocation()

  // location.serach = '?qty=1'
  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  // console.log(id, qty)

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  console.log(cartItems)

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty))
    }
  }, [dispatch, id, qty])

  return <div>Cart</div>
}

export default CartPage
