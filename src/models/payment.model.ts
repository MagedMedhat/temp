import { Schema, model } from "mongoose";

const PaymentSchema = new Schema(
  {
    subscription_id: {
      type: Schema.Types.ObjectId,
      ref: "Subscription",
      required: true,
      index: true,
    },
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, required: true, default: "USD" },
    gateway: {
      type: String,
      enum: ["paypal", "stripe"],
      required: true,
    },
    gateway_transaction_id: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
    paid_at: Date,
  },
  { timestamps: true, versionKey: false },
);

export default model("Payment", PaymentSchema);