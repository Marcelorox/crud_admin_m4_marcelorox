import { Router } from "express";
import { courseControllers, usersControllers } from "../controllers";
import { validateLogin } from "../schemas";
import { checkBody, verifyAdmin, verifyJwt } from "../middlewares";
import { validateCourseRegister } from "../schemas/courses.schemas";
import { verifyCourse, verifyUser } from "../middlewares/users.middlewares";

const coursesRoutes: Router = Router();

// coursesRoutes.post("", checkBody(validateLogin), usersControllers.loginUser);

coursesRoutes.post(
  "",
  verifyJwt,
  verifyAdmin,
  checkBody(validateCourseRegister),
  courseControllers.registerCourse
);
coursesRoutes.get("", courseControllers.listCourse);
coursesRoutes.post(
  "/:courseId/users/:userId",
  verifyJwt,
  verifyAdmin,
  verifyCourse,
  verifyUser,

  courseControllers.UserCourseRegister
);
// coursesRoutes.delete("/:courseId/users/:userId", courseControllers);
// coursesRoutes.get("/:id/users", courseControllers);

export { coursesRoutes };
