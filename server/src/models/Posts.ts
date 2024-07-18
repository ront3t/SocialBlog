import {Schema, model, InferSchemaType} from "mongoose";

const postSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Array<string>,
    },
    comments: {
      type: Array<string>,
    },
  },
  { timestamps: true });

type Post = InferSchemaType<typeof postSchema>

export default model<Post>("Post", postSchema);