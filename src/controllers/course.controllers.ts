import { Request, Response } from "express";
import { Course, UserCourse } from "../interfaces";
import { coursesServices } from "../services";

const registerCourse = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const course: Course = await coursesServices.createCourse(req.body);

  return res.status(201).json(course);
};

const listCourse = async (req: Request, res: Response): Promise<Response> => {
  const courses: Course[] = await coursesServices.listCourses();

  return res.status(200).json(courses);
};

const UserCourseRegister = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const requestData = {
    courseId: Number(req.params.courseId),
    userId: Number(req.params.userId),
  };

  const courses: UserCourse = await coursesServices.registerCourseUser(
    requestData
  );

  return res.status(201).json({
    message: "User successfully vinculed to course",
  });
};

const desactiveCourseOfUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const courseId = Number(req.params.courseId);
  const userId = Number(req.params.userId);

  const courses: UserCourse = await coursesServices.deleteCourse(
    courseId,
    userId
  );

  return res.status(204).json();
};

const listUsersCourses = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const courses: Course[] = await coursesServices.listUserCourses(
    Number(req.params.id)
  );
  return res.status(200).json(courses);
};

export default {
  registerCourse,
  listCourse,
  listUsersCourses,
  UserCourseRegister,
  desactiveCourseOfUser,
};
