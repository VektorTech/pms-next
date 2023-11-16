import jwt from "jsonwebtoken";

export interface UserTokenPayload extends jwt.JwtPayload {
  type: "patient-user" | "doctor-user";
  email: string;
  user_id: number;
}
