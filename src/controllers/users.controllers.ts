import { Request, Response } from "express";
import { User, UserCreate } from "../interfaces";
import { usersServices } from "../services";

const loginUser = async (req: Request, res: Response): Promise<Response> => {
  const token: string = await usersServices.login(req.body);
  return res.status(201).json(token);
};

const createUser = async (req: Request, res: Response): Promise<Response> => {
  const users: User = await usersServices.createUser(req.body);

  return res.status(201).json(users);
};

const listUsers = async (req: Request, res: Response): Promise<Response> => {
  const users: User[] = await usersServices.listUser();

  return res.status(201).json(users);
};

export default { createUser, loginUser, listUsers };
