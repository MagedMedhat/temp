import { Schema, model } from "mongoose";

const PlanSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    job_post_limit: { type: Number, default: null },
    price_monthly: { type: Number, required: true, min: 0 },
    price_yearly: { type: Number, required: true, min: 0 },
    is_featured: { type: Boolean, default: false },
    has_direct_messaging: { type: Boolean, default: false },
    has_premium_reports: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false },
);

export default model("Plan", PlanSchema);