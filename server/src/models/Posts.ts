import { Schema,InferSchemaType, model} from 'mongoose'
const postSchema = new Schema(
  {
    userId: {
      type: String,
    },
    title: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
  },
  { timestamps: true });

type Post = InferSchemaType<typeof postSchema>

export default model<Post>("Post", postSchema);