import { Schema, model, Types } from "mongoose";

export type ApplicationStatus =
  | "submitted"
  | "under_review"
  | "accepted"
  | "rejected"
  | "cancelled";

export interface IApplication {
  job_id: Types.ObjectId;
  candidate_id: Types.ObjectId;
  resume: string;
  resume_text?: string;
  cover_letter?: string;
  message?: string;
  contact_email: string;
  contact_phone: string;
  status: ApplicationStatus;
  reviewed_at?: Date;
  rejection_reason?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ApplicationSchema = new Schema<IApplication>(
  {
    job_id: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
      index: true,
    },
    candidate_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    resume: { type: String, required: true },
    resume_text: String,
    cover_letter: String,
    message: String,
    contact_email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    contact_phone: { type: String, required: true },
    status: {
      type: String,
      enum: ["submitted", "under_review", "accepted", "rejected", "cancelled"],
      default: "submitted",
    },
    reviewed_at: Date,
    rejection_reason: String,
  },
  { timestamps: true, versionKey: false },
);

ApplicationSchema.index({ job_id: 1, candidate_id: 1 }, { unique: true });

export default model<IApplication>("Application", ApplicationSchema);