const { model, Schema } = require('mongoose')
const PLM = require('passport-local-mongoose')

const userSchema = new Schema(
  {
    profilePic: {
      type: String,
      default:
        'https://clipart.wpblink.com/sites/default/files/wallpaper/profile-clipart/180637/profile-clipart-user-profile-180637-2677408.jpg'
    },
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER'
    },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }], // Posts ids
    drafts: [{ type: Schema.Types.ObjectId, ref: 'Draft' }], // Draft ids
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Following ids
    bookmarked: [{ type: Schema.Types.ObjectId, ref: 'Post' }], // Bookmarked Posts object
    bio: String
  },
  {
    timestamps: true,
    versionKey: false
  }
)

userSchema.plugin(PLM, { usernameField: 'email' })

module.exports = model('User', userSchema)
