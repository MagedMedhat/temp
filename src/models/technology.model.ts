import { Schema, model } from "mongoose";

export interface ITechnology {
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const TechnologySchema = new Schema<ITechnology>(
  {
    name: { type: String, required: true, trim: true, unique: true },
  },
  { timestamps: true, versionKey: false },
);

export default model<ITechnology>("Technology", TechnologySchema);