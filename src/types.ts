import jwt from "jsonwebtoken";

export interface UserTokenPayload extends jwt.JwtPayload {
  type: "patient-user";
  email: string;
  user_id: number;
}
