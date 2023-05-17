// import { AuthenticationError } from "@apollo/server";

import verify from "jsonwebtoken";

export default (context) => {
  const authHeader = context.req.headers.authorization || "";
  if (!authHeader) throw new Error("Authentication header must be provided ");

  const token = authHeader.split("Bearer")[1];
  if (!token) throw new Error("Authentication token must be 'Bearer [token]' ");

  try {
    return verify(token, "UNSAFE_STRING");
  } catch (e) {
    throw new Error("Invalid/Expired token");
  }
};
