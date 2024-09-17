import mongoose, { Schema,InferSchemaType, model} from 'mongoose'
const notificationSchema = new Schema(
  {
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    type: {
        type: String,
        required: true,
        enum: ['follow','like']
    },
    read: {
        type: Boolean,
        default: false
    }
  },
  { timestamps: true });

type Notification = InferSchemaType<typeof notificationSchema>

export default model<Notification>("Notification", notificationSchema);