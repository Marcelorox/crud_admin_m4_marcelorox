import { Request, Response } from "express";
import { User } from "../interfaces";
import { usersServices } from "../services";

const createUser = async (req: Request, res: Response): Promise<Response> => {
  const users: User = await usersServices.createUser(req.body);
  return res.status(201).json(users);
};

export default { createUser };
