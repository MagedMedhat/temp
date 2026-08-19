import { Schema, model } from "mongoose";

export interface ICategory {
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, trim: true },
  },
  { timestamps: true, versionKey: false },
);

export default model<ICategory>("Category", CategorySchema);
