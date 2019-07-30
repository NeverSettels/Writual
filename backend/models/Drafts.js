const { model, Schema } = require('mongoose')

const draftSchema = new Schema(
  {
    title: {
      type: String,
      default: 'Untitled Draft'
    },
    postedBy: { type: Schema.Types.ObjectId, ref: 'User' },
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
