/* eslint-disable no-undef */
const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {

    try {
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connected DB')

    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB;