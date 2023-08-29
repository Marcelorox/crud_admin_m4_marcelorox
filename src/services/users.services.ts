import format from "pg-format";
import bcrypt, { compare, hash } from "bcrypt";
import { QueryConfig } from "pg";
import { client } from "../database";
import {
  User,
  UserCreate,
  UserResulte,
  UserWithoutPassword,
} from "../interfaces";
import { AppError } from "../errors";
import { sign } from "jsonwebtoken";
import {
  validateGetUsers,
  validateRegisterUser,
  validateRegisterUserReturn,
} from "../schemas/users.schemas";

const login = async (payload: User) => {
  const queryString: string = `SELECT * FROM users WHERE "email" = $1`;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [payload.email],
  };

  const queryresult: UserResulte = await client.query(queryConfig);

  if (!queryresult.rowCount) {
    throw new AppError("Wrong email/password", 401);
  }

  const users: User = queryresult.rows[0];
  const passwodVerify: boolean = await compare(
    payload.password,
    users.password
  );

  if (!passwodVerify) {
    throw new AppError("Wrong email/password", 401);
  }

  const token: string = sign(
    {
      email: users.email,
      admin: users.admin,
    },
    process.env.SECRET_KEY!,
    { subject: users.id.toString(), expiresIn: process.env.EXPIRES_IN! }
  );

  return { token };
};

const createUser = async (
  payload: UserCreate
): Promise<UserWithoutPassword> => {
  payload.password = await hash(payload.password, 12);

  const queryString: string = format(
    'INSERT INTO  "users" (%I) VALUES (%L) RETURNING * ',
    Object.keys(payload),
    Object.values(payload)
  );

  const queryresult: UserResulte = await client.query(queryString);

  return validateRegisterUserReturn.parse(queryresult.rows[0]);
};

const listUser = async (): Promise<any> => {
  const queryString: string = `SELECT * FROM users`;
  const queryResult: UserResulte = await client.query(queryString);
  const users = validateGetUsers.parse(queryResult.rows);

  return users;
};

const listCoursesUser = async (id: number): Promise<any> => {
  const queryString: string = `SELECT * FROM "users" WHERE "id" = $1`;
  const queryResult: UserResulte = await client.query(queryString, [id]);
  const users = validateGetUsers.parse(queryResult.rows);

  if (!queryResult.rows) {
    throw new AppError("No course found", 404);
  }

  return users;
};

export default {
  login,
  createUser,
  listUser,
  listCoursesUser,
};
