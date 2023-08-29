import { Router } from "express";
import { usersControllers } from "../controllers";
import { checkBody, errorCheck, verifyEmail, verifyJwt } from "../middlewares";
import { validateRegisterUser } from "../schemas/users.schemas";
import { verifyAdmin } from "../middlewares/users.middlewares";

const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  verifyEmail,
  checkBody(validateRegisterUser),
  usersControllers.createUser
);

usersRoutes.get("", verifyJwt, verifyAdmin, usersControllers.listUsers);
// usersRoutes.get("/:id/courses", );

export { usersRoutes };
