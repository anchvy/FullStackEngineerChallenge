import mongoose from 'mongoose'

// Get Mongoose to use the global promise library
mongoose.Promise = Promise
mongoose.connect(process.env.MONGODB_PATH, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})

/**
 * Connect to MongoDB
 * @param  {string} options.collection - Collection's name
 * @param  {Schema} options.schema - Collection's schema
 * @return {Model} Mongoose's model
 */
export const connect = ({ collection, schema }) => {
  return mongoose.model(collection, schema)
}

export const Mongoose = mongoose
export default connect
