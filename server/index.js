import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
// this is module type importing
// so file extention must be included (.js)
// in package.json
// "type": "module"
// needs to be added
import connectDB from './config/db.js'
import productRountes from './routes/productRoutes.js'
import userRountes from './routes/userRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'

dotenv.config()

// connect to mongodb
connectDB()

const app = express()
// this will allow to accept json data in the req.body
// simply parse request body as JSON
app.use(express.json())
app.use(cors())

// npm start
// script is added in the package.json file
// "start": "nodemon index.js",

app.get('/', (req, res) => {
  res.json('OHAIOO')
})

app.use('/api/products', productRountes)
app.use('/api/users', userRountes)

// custom middleware if invalid path is accessed
app.use(notFound)

// overwriting the default error handler using custom error handler middleware
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`server at port ${PORT}`)
})
