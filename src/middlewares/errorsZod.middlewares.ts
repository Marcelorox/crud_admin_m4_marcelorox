import { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";
import { JsonWebTokenError } from "jsonwebtoken";
import { AppError } from "../errors";

function errorCheck(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): Response {
  if (error instanceof AppError) {
    return res.status(error.status).json({ message: error.message });
  }

  if (error instanceof z.ZodError) {
    return res.status(400).json(error.flatten().fieldErrors);
  }

  if (error instanceof JsonWebTokenError) {
    return res.status(401).json({ message: error.message });
  }
  console.error(error);
  return res.status(500).json({ error: "Internal Server Error." });
}
export default errorCheck;