import { Schema, model } from "mongoose";

const NotificationSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: [
        "job_approved",
        "job_rejected",
        "application_status_changed",
        "payment_completed",
        "payment_failed",
      ],
      required: true,
    },
    title: { type: String, required: true },
    content: { type: String, required: true },
    data: Schema.Types.Mixed,
    is_read: { type: Boolean, default: false },
    read_at: Date,
  },
  { timestamps: true, versionKey: false },
);

export default model("Notification", NotificationSchema);
