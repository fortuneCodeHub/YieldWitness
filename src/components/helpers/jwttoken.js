import { jwtVerify } from "jose";

export async function verifyJWT(token) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const { payload } = await jwtVerify(token, secret);

    return { valid: true, decoded: payload };
  } catch (err) {
    return { valid: false, error: err.message };
  }
}