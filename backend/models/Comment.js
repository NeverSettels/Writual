const { model, Schema } = require('mongoose')

const commentSchema = new Schema(
  {
    postedBy: { type: Schema.Types.ObjectId, ref: 'User' }, //ObJectId of user that commented
    postedOn: { type: Schema.Types.ObjectId, ref: 'Post' }, //ObJectId of post commented on
    content: [Object]
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('Comment', commentSchema)
