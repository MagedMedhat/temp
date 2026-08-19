import { Schema, model } from "mongoose";

const JobSchema = new Schema(
  {
    employer_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    category_id: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    technologies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Technology",
      },
    ],
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    responsibilities: String,
    requirements: String,
    location: {
      type: String,
      trim: true,
      required: function (this: { work_type?: string }): boolean {
        return this.work_type !== "remote";
      },
    },
    work_type: {
      type: String,
      enum: ["remote", "onsite", "hybrid"],
      required: true,
    },
    salary_min: { type: Number, min: 0 },
    salary_max: { type: Number, min: 0 },
    experience_level: {
      type: String,
      enum: ["entry", "junior", "mid", "senior", "lead"],
    },
    application_deadline: { type: Date, required: true },
    status: {
      type: String,
      enum: [
        "draft",
        "pending_approval",
        "approved",
        "rejected",
        "expired",
        "closed",
      ],
      default: "draft",
      index: true,
    },
    rejection_reason: String,
    views_count: { type: Number, default: 0 },
    applications_count: { type: Number, default: 0 },
  },
  { timestamps: true, versionKey: false },
);

JobSchema.pre("validate", function () {
  if (this.work_type === "remote") this.location = undefined;
});

JobSchema.index({ title: "text", description: "text" });
JobSchema.index({ status: 1, createdAt: -1 });

export default model("Job", JobSchema);
