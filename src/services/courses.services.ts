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

const registerCourseUser = async (
  course: UserCourseCreate
): Promise<UserCourse> => {
  const queryString: string = format(
    `INSERT INTO "userCourses" (%I) VALUES (%L) RETURNING *`,
    Object.keys(course),
    Object.values(course)
  );
  const queryResult: UserCourseResulte = await client.query(queryString);

  return queryResult.rows[0];
};

const deleteCourse = async (courseId: number, userId: number): Promise<any> => {
  const queryString: string = `UPDATE "userCourses"
    SET active = false
    WHERE "userId" = $1 AND "courseId" = $2
    RETURNING *`;

  const queryResult: CourseResulte = await client.query(queryString, [
    courseId,
    userId,
  ]);

  const users = validateGetCourses.parse(queryResult.rows);

  return users;
};
const listUserCourses = async (id: number): Promise<any> => {
  const queryString: string = `SELECT * FROM "courses" WHERE "id" = $1`;
  const queryResult: CourseResulte = await client.query(queryString, [id]);
  const users = validateGetCourses.parse(queryResult.rows);

  return users;
};

export default {
  createCourse,
  listCourses,
  registerCourseUser,
  listUserCourses,
  deleteCourse,
};
