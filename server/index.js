import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import products from './data/products.js'

dotenv.config()

const app = express()
app.use(cors())

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
