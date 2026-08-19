import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
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

export default model("Comment", CommentSchema);
