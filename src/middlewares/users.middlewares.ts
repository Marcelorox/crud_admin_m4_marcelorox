import "dotenv/config";
import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { client } from "../database";
import { User } from "../interfaces";
import { AppError } from "../errors";

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
    throw new AppError("Missing bearer token!", 401);
  }

  const token = bearerToken.split(" ")[1];
  verify(token, process.env.SECRET_KEY!, (err, decoded) => {
    if (err) throw new AppError(err.message, 401);
    res.locals = { ...res.locals, decoded };
  });

  return next();
};

const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  const { admin } = res.locals.decoded;
  if (!admin) throw new AppError("insuficient permition", 403);

  return next();
};

const verifyCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const param: number = Number(req.params.courseId);

  const queryName = await client.query("SELECT * FROM courses WHERE id = $1;", [
    param,
  ]);

  if (!queryName.rowCount) {
    return res.status(409).json({
      message: "User/course not found",
    });
  }
  return next();
};

const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const param: number = Number(req.params.userId);

  const queryName = await client.query("SELECT * FROM users WHERE id = $1;", [
    param,
  ]);

  if (!queryName.rowCount) {
    return res.status(409).json({
      message: "User/course not found",
    });
  }
  return next();
};

export { verifyJwt, verifyEmail, verifyAdmin, verifyUser, verifyCourse };
