const { model, Schema } = require('mongoose')

const draftSchema = new Schema(
  {
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    numBookmarks: Number,
    summary: String,
    categories: [String],
    content: Object
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('Draft', draftSchema)
