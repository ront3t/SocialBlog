import mongoose, {Schema, model, InferSchemaType} from "mongoose";
import Posts from "./Posts";

const UserSchema = new Schema(
  {
    username:{
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    fullname:{
      type: String,
      required:true,
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
    following: [{
      type:mongoose.Schema.Types.ObjectId,
      ref: "User",
      default:[]
    }],
    followers: [{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      default:[]
    }],
    profileImg: {
      type: String,
      default:""
    },
    coverImg: {
      type: String,
      default:""
    },
    bio: {
      type: String,
      default:""
    },
    link: {
      type: String,
      default:""
    },
    likedPosts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: Posts,
      default:[],
    }]
    
  },
  { timestamps: true }
);
type User = InferSchemaType<typeof UserSchema>

export default model<User>("User", UserSchema);