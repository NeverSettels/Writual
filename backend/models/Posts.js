const { model, Schema } = require('mongoose')

const postSchema = new Schema(
  {
    title: String,
    postedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    numBookmarks: { type: Number, default: 0 },
    summary: String,
    categories: [String],
    content: String
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('Post', postSchema)
