import "dotenv/config";
import jwt, { Jwt } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { client } from "../database";
import { User } from "../interfaces";

const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const payload: User = req.body;

  if (payload.email) {
    const queryName = await client.query(
      "SELECT * FROM users WHERE email = $1;",
      [payload.email]
    );
    if (queryName.rowCount) {
      return res.status(409).json({ message: "Email already exists." });
    }
  }
  return next();
};
const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
  const bearerToken: string | undefined = req.headers.authorization;

  if (!bearerToken) {
    return res.status(401).json({ error: "Authorization token missing" });
  }

  const authorizationHeader = bearerToken;

  const token = authorizationHeader.replace("Bearer ", "");
  const decodedToken: any = jwt.verify(token, process.env.SECRET_KEY as string);

  if (!decodedToken.admin) {
    return res.status(401).json({ message: "Usuário não autorizado." });
  }
  return next();
};

export { verifyEmail, verifyJwt };
