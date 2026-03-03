import jwt from "jsonwebtoken";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

export function generateAccessToken(payload: object) {
  return jwt.sign(payload, JWT_ACCESS_SECRET, {expiresIn: "1h"});
}

export function generateRefreshToken(payload: object) {
  return jwt.sign(payload, JWT_REFRESH_SECRET, {expiresIn: "7d"});
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, JWT_ACCESS_SECRET);
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, JWT_REFRESH_SECRET);
}