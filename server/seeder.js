import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

// this seeder is used to test connection and validation
// don't use this if data already present in the database

// need to run seperatly
// check for run commend below

const importData = async () => {
  try {
    // for clearing the database
    await Product.deleteMany()
    await User.deleteMany()
    await Order.deleteMany()

    // inserting users
    const createdUsers = await User.insertMany(users)

    const adminUser = createdUsers[0]._id
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })

    // inserting products
    await Product.insertMany(sampleProducts)

    console.log('Data Imported!!!')
    process.exit()
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    // clearing the database
    await Product.deleteMany()
    await User.deleteMany()
    await Order.deleteMany()

    console.log('Data Destroyed!!!')
    process.exit()
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

// for getting command argument
// like if we want to run this file:
// node server/seeder -d
// process.argv[2] give -d

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}

// to run this
// npm run data:import
// npm run data:destroy -d

// script is added in the package.json file
// "data:import": "node seeder",
// "data:destroy": "node seeder -d"
