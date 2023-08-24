import { Router } from "express";
import { usersControllers } from "../controllers";
import { validateLogin } from "../schemas";
import { checkBody, verifyEmail } from "../middlewares";

const loginRoutes: Router = Router();

loginRoutes.post("", checkBody(validateLogin), usersControllers.loginUser);

export { loginRoutes };
