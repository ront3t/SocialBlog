import {Schema, model, InferSchemaType} from "mongoose";

const UserSchema = new Schema(
  {
    username:{
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
      select: false
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
  },
  { timestamps: true }
);
type User = InferSchemaType<typeof UserSchema>

export default model<User>("User", UserSchema);