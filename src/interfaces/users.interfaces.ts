import { QueryResult } from "pg";

interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  admin: boolean;
}

type UserCreate = Omit<User, "id">;
type UserResulte = QueryResult<User>;

interface Course {
  id: number;
  name: string;
  description: string;
}

type CourseCreate = Omit<Course, "id">;
type CourseResulte = QueryResult<Course>;

interface UserCourse {
  id: number;
  active: boolean;
  userId: number;
  courseId: number;
}
type UserCourseCreate = Omit<UserCourse, "id">;
type UserCourseResulte = QueryResult<UserCourse>;

export {
  UserCourse,
  UserCourseCreate,
  UserCourseResulte,
  Course,
  CourseResulte,
  CourseCreate,
  UserCreate,
  UserResulte,
  User,
};
