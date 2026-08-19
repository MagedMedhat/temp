import { Schema, model } from "mongoose";

export interface ISkill {
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const SkillSchema = new Schema<ISkill>(
  {
    name: { type: String, required: true, trim: true, unique: true },
  },
  { timestamps: true, versionKey: false },
);

export default model<ISkill>("Skill", SkillSchema);