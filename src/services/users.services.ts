import format from "pg-format";
import bcrypt from "bcrypt";
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
    throw new AppError("email/password are incorrect", 401);
  }

  const users: User = queryresult.rows[0];

  if (users.password !== payload.password) {
    throw new AppError("email/password are incorrect", 401);
  }

  const userToken: string = sign(
    {
      email: users.email,
      admin: users.admin,
    },
    process.env.SECRET_KEY!,
    { subject: users.id.toString(), expiresIn: process.env.EXPIRES_IN! }
  );

  return userToken;
};

const createUser = async (
  payload: UserCreate
): Promise<UserWithoutPassword> => {
  const saltRounds = process.env.SECRET_KEY!;
  const encriptedPassword = bcrypt.hash(payload.password, saltRounds);

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

export default {
  login,
  createUser,
  listUser,
};
