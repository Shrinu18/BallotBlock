import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_AUTH_KEY);

export async function createJWT(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(secret);
}

export async function verifyJWT(token) {
  const { payload } = await jwtVerify(token, secret);

  return payload;
}

export async function createJWTNoExpiry(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .sign(secret);
}

export async function verifyJWTNoExpiry(token) {
  const { payload } = await jwtVerify(token, secret, {
    clockTolerance: 0,
  });

  return payload;
}
