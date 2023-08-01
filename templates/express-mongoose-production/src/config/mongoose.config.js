const mongoose = require('mongoose')
const Logger = require('../utils/logger.utils')

// add mongoose connection "On" Event handlers here

module.exports = {
  connectProduction: async () => {
    try {
      await mongoose.connect(process.env.DB_URI_PROD)
      Logger.info('Connected to MongoDB Prod...')
    } catch (err) {
      Logger.error('Could not connect to MongoDB Prod...')
      throw new Error(err)
    }
  },
  connectDevelopment: async () => {
    try {
      await mongoose.connect(process.env.DB_URI_DEV)
      Logger.info('Connected to MongoDB Dev...')
    } catch (err) {
      Logger.error('Could not connect to MongoDB Dev...')
      throw new Error(err)
    }
  }
}
