import { Schema, model, Types } from "mongoose";

export interface IWishlist {
  candidate_id: Types.ObjectId;
  job_id: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const WishlistSchema = new Schema<IWishlist>(
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

export default model<IWishlist>("Wishlist", WishlistSchema);