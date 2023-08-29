import format from "pg-format";
import {
  Course,
  CourseCreate,
  CourseResulte,
  UserCourse,
  UserCourseCreate,
  UserCourseResulte,
} from "../interfaces";
import { client } from "../database";
import { validateGetCourses } from "../schemas/courses.schemas";

const createCourse = async (payload: CourseCreate): Promise<Course> => {
  const queryString: string = format(
    'INSERT INTO  "courses" (%I) VALUES (%L) RETURNING * ',
    Object.keys(payload),
    Object.values(payload)
  );

  const queryresult: CourseResulte = await client.query(queryString);

  return queryresult.rows[0];
};

const listCourses = async (): Promise<any> => {
  const queryString: string = `SELECT * FROM courses`;
  const queryResult: CourseResulte = await client.query(queryString);
  const users = validateGetCourses.parse(queryResult.rows);

  return users;
};

const register = async (course: UserCourseCreate): Promise<UserCourse> => {
  const queryString: string = format(
    `INSERT INTO "userCourses" (%I) VALUES (%L) RETURNING *`,
    Object.keys(course),
    Object.values(course)
  );
  const queryResult: UserCourseResulte = await client.query(queryString);

  return queryResult.rows[0];
};

const deleteCourse = async (course: any): Promise<any> => {
  const queryString: string = format(
    `INSERT INTO "userCourses" courseId VALUES $1 RETURNING *`,
    Object.keys(course),
    Object.values(course)
  );
  const queryResult: CourseResulte = await client.query(queryString);

  const users = validateGetCourses.parse(queryResult.rows);

  return users;
};

export default {
  createCourse,
  listCourses,
  register,
};
