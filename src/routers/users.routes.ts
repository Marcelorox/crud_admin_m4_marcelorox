import { Router } from "express";
import { usersControllers } from "../controllers";
import { checkBody, errorCheck, verifyEmail, verifyJwt } from "../middlewares";
import { validateRegisterUser } from "../schemas/users.schemas";

const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  verifyEmail,
  checkBody(validateRegisterUser),
  usersControllers.createUser
);

usersRoutes.get("", verifyJwt, usersControllers.listUsers);

export { usersRoutes };
