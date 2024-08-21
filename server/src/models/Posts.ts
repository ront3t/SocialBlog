import mongoose, { Schema,InferSchemaType, model} from 'mongoose'
const postSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required:true
    },
    text: {
      type: String,
    },
    img: {
      type:String
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      }
    ],
    comments: [
      {
        text: {
          type: String,
          required: true
        },
        userId:{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required:true
        },
      }
    ]

  },
  { timestamps: true });

type Post = InferSchemaType<typeof postSchema>

export default model<Post>("Post", postSchema);