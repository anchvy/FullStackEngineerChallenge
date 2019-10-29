import { Mongoose, connect } from '../connectors/mongodb'

const collection = 'employee'
const schema = new Mongoose.Schema({
  id: { type: String, required: true },
  role: String,
  name: String,
  createdAt: Date,
  updatedAt: Date,
  isActive: Boolean,
})

schema.index({ id: 1 }, { unique: true })

export default connect({
  collection,
  schema,
})
