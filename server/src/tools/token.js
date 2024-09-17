import jwt from "jsonwebtoken";

export function createToken(userInfo) {
  const secret = process.env.secret;
  const info = JSON.stringify(userInfo);
  const token = jwt.sign(info, secret);
  return token;
}
