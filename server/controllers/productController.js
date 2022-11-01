import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public

// asyncHandler for handling exceptions inside of async express routes
const getProducts = asyncHandler(async (req, res) => {
  // Product.find({}) or mongoose method gives a promis.
  // so async await should use
  const products = await Product.find({})

  // throwing error for checking
  // res.status(401)
  // throw new Error('ERROR COMING THROUGH....')

  res.json(products)
})

// @desc    Fetch all product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    // if we don't use custom middleware for error handling
    //   res.status(404).json({ message: 'Product not found.' })

    // we are using custom middleware.
    // error will go through our custom middleware
    res.status(404)
    throw new Error('Product Not Found.')
  }
})

export { getProductById, getProducts }
