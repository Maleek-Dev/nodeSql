import crypto from "crypto";

export function generateId() {
  return `USR-${crypto.randomBytes(6).toString("hex")}`;
}
export const generateProfileId = () => {
  return `PRO-${crypto.randomBytes(6).toString("hex")}`;
}
export const generatePostId = () => {
  return `ORD-${crypto.randomBytes(6).toString("hex")}`;
}