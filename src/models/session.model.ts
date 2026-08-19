import { Schema, model, Types } from "mongoose";

export interface ISession {
  user_id: Types.ObjectId;
  refresh_token: string;
  expires_at: Date;
  revoked_at: Date | null;
  last_used_at: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const SessionSchema = new Schema<ISession>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    refresh_token: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    expires_at: {
      type: Date,
      required: true,
    },
    revoked_at: {
      type: Date,
      default: null,
    },
    last_used_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
).index({ expires_at: 1 }, { expireAfterSeconds: 0 });

export default model<ISession>("Session", SessionSchema);
