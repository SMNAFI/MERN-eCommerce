import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
// this is module type importing
// so fileName.js must be included
// in package.json
// "type": "module"
// needs to be added
import connectDB from './config/db.js'
import products from './data/products.js'

dotenv.config()

// connect to mongodb
connectDB()

const app = express()
app.use(cors())

// npm start
// script is added in the package.json file
// "start": "nodemon index.js",

app.get('/', (req, res) => {
  res.json('OHAIOO')
})

app.get('/api/products', (req, res) => {
  res.json(products)
})

app.get('/api/product/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id)
  res.json(product)
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`server at port ${PORT}`)
})
