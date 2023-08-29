import { QueryResult } from "pg";

interface Course {
  id: number;
  name: string;
  description: string;
}

type CourseCreate = Omit<Course, "id">;
type CourseResulte = QueryResult<Course>;

interface UserCourse {
  id: number;
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
};
