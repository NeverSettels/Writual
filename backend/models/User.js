const { model, Schema } = require('mongoose')
const PLM = require('passport-local-mongoose')

const userSchema = new Schema(
  {
    username: String,
    email: String,
    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER'
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }], // Posts ids
    drafts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Draft' }], // Draft ids
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Following ids
    bookmarked: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }], // Bookmarked Posts object
    bio: String
  },
  {
    timestamps: true,
    versionKey: false
  }
)

userSchema.plugin(PLM, { usernameField: 'username' })

module.exports = model('User', userSchema)
