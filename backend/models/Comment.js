const { model, Schema } = require('mongoose')

const commentSchema = new Schema(
  {
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, //ObJectId of user that commented
    postedOn: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }, //ObJectId of post commented on
    content: String
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('Comment', commentSchema)
