import { Schema, model } from "mongoose";

const EmployerProfileSchema = new Schema(
  {
    company_name: { type: String, required: true, trim: true },
    company_logo: String,
    description: { type: String, trim: true, maxlength: 2000 },
    industry: { type: String, trim: true },
    website: { type: String, trim: true },
  },
  { _id: false },
);

const CandidateSkillSchema = new Schema(
  {
    skill_id: {
      type: Schema.Types.ObjectId,
      ref: "Skill",
      required: true,
    },
  },
  { _id: false },
);

const CandidateProfileSchema = new Schema(
  {
    headline: { type: String, trim: true },
    bio: { type: String, trim: true, maxlength: 2000 },
    location: { type: String, trim: true },
    portfolio_url: { type: String, trim: true },
    resume: String,
    skills: [CandidateSkillSchema],
    experience_level: {
      type: String,
      enum: ["entry", "junior", "mid", "senior", "lead"],
      required: true,
    },
  },
  { _id: false },
);

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "employer", "candidate"],
      required: true,
    },
    employerProfile: {
      type: EmployerProfileSchema,
      required() {
        return this.role === "employer";
      },
    },
    candidateProfile: {
      type: CandidateProfileSchema,
      required() {
        return this.role === "candidate";
      },
    },
    is_blocked: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false },
);

UserSchema.pre("validate", function () {
  if (this.role === "employer") this.candidateProfile = undefined;
  if (this.role === "candidate") this.employerProfile = undefined;
  if (this.role === "admin") {
    this.employerProfile = undefined;
    this.candidateProfile = undefined;
  }
});

export default model("User", UserSchema);
