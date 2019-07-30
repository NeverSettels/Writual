const { model, Schema } = require('mongoose')

const draftSchema = new Schema(
  {
    postedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    numBookmarks: Number,
    summary: String,
    categories: [String],
    content: String
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('Draft', draftSchema)
