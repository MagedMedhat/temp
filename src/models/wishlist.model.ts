import { Schema, model } from "mongoose";

const WishlistSchema = new Schema(
  {
    candidate_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    job_id: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

WishlistSchema.index({ candidate_id: 1, job_id: 1 }, { unique: true });

export default model("Wishlist", WishlistSchema);