import express from 'express'
// import Product from '../models/productModel.js'
// import asyncHandler from 'express-async-handler'
import {
  getProductById,
  getProducts,
} from '../controllers/productController.js'

const router = express.Router()

// router.get('/', getProducts)     (we can also do this)
router.route('/').get(getProducts)
router.route('/:id').get(getProductById)

// moved to controllers
// router.get(
//   '/',
//   asyncHandler(async (req, res) => {
//     // Product.find({}) or mongoose method gives a promis.
//     // so async await should use
//     const products = await Product.find({})

//     // throwing error for checking
//     // res.status(401)
//     // throw new Error('ERROR COMING THROUGH....')

//     res.json(products)
//   })
// )

export default router
