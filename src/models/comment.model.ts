import { Schema, model, Types } from "mongoose";

export interface IComment {
  job_id: Types.ObjectId;
  user_id: Types.ObjectId;
  content: string;
  is_approved: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    job_id: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
      index: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: { type: String, required: true, trim: true, maxlength: 1000 },
    is_approved: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false },
);

export default model<IComment>("Comment", CommentSchema);