import { Schema, model } from "mongoose";

const SubscriptionSchema = new Schema(
  {
    employer_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    plan_id: {
      type: Schema.Types.ObjectId,
      ref: "Plan",
      required: true,
    },
    billing_cycle: {
      type: String,
      enum: ["monthly", "yearly"],
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "expired", "canceled"],
      default: "active",
    },
    current_period_start: { type: Date, required: true },
    current_period_end: { type: Date, required: true },
  },
  { timestamps: true, versionKey: false },
);

export default model("Subscription", SubscriptionSchema);