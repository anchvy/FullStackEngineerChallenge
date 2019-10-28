import { Mongoose, connect } from '../connectors/mongodb'

const collection = 'reviews'

const schemaOptions = {
  collection,
  versionKey: false,
}

const schema = new Mongoose.Schema(
  {
    id: { type: String, required: true },
    score: Number,
    text: String,
    reviewerId: String,
    revieweeId: String,
    createdAt: Date,
    updatedAt: Date,
    isActive: Boolean,
  },
  schemaOptions
)

schema.index({ id: 1 }, { unique: true })
schema.index({ revieweeId: 1, reviewerId: 1 }, { unique: true })

export default connect({
  collection,
  schema,
})
