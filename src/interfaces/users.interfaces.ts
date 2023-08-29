import { QueryResult } from "pg";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  admin: boolean;
}

type UserWithoutPassword = Omit<User, "password">;
type UserCreate = Omit<User, "id">;
type UserResulte = QueryResult<User>;

export { UserCreate, UserResulte, User, UserWithoutPassword };
