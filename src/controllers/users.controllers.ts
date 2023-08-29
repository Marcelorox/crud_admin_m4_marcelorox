import { Request, Response } from "express";
import { User, UserWithoutPassword } from "../interfaces";
import { usersServices } from "../services";

const loginUser = async (req: Request, res: Response): Promise<Response> => {
  const token = await usersServices.login(req.body);
  return res.status(200).json(token);
};

const createUser = async (req: Request, res: Response): Promise<Response> => {
  const users: UserWithoutPassword = await usersServices.createUser(req.body);

  return res.status(201).json(users);
};

const listUsers = async (req: Request, res: Response): Promise<Response> => {
  const users: User[] = await usersServices.listUser();

  return res.status(200).json(users);
};
const listCoursesUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users: User[] = await usersServices.listCoursesUser(
    Number(req.params.id)
  );

  return res.status(200).json(users);
};

export default { createUser, loginUser, listUsers, listCoursesUser };
