import { Schema, model } from "mongoose";

const TechnologySchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
  },
  { timestamps: true, versionKey: false },
);

export default model("Technology", TechnologySchema);