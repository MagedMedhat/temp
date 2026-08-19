import jwt from "jsonwebtoken";
import crypto from "crypto";
import { Response } from "express";
import { TOKEN_EXPIRATION } from "../modules/auth/auth.constants.js";

export interface AccessTokenPayload {
  userId: string;
  role: string;
  sessionId?: string;
}

export const generateAccessToken = (payload: AccessTokenPayload): string => {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET as string,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    } as jwt.SignOptions,
  );
};

export const verifyAccessToken = (
  token: string,
): AccessTokenPayload & jwt.JwtPayload => {
  return jwt.verify(
    token,
    process.env.JWT_SECRET as string,
  ) as AccessTokenPayload & jwt.JwtPayload;
};

export const hashToken = (token: string): string => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

export const generateSecurityToken = (): {
  rawToken: string;
  hashedToken: string;
} => {
  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = hashToken(rawToken);
  return { rawToken, hashedToken };
};

export const setRefreshCookie = (res: Response, refreshToken: string): void => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/api/auth/refresh",
    priority: "high",
    maxAge: TOKEN_EXPIRATION.refresh_token,
  });
};

export const clearRefreshCookie = (res: Response): void => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/api/auth/refresh",
  });
};
