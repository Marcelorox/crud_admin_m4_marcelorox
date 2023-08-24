// import format from "pg-format";
// import { QueryConfig, QueryResult } from "pg";
// import { client } from "../database";
// import { User, UserCreate, UserResulte } from "../interfaces";
// import { AppError } from "../errors";
// import { sign } from "jsonwebtoken";

// const login = async (payload: User) => {
//   const queryString: string = `SELECT * WHERE email = $1`;

//   const queryConfig: QueryConfig = {
//     text: queryString,
//     values: [payload.email],
//   };

//   const queryresult: UserResulte = await client.query(queryConfig);

//   if (!queryresult.rowCount) {
//     throw new AppError("email/password are incorrect", 401);
//   }

//   const users: User = queryresult.rows[0];

//   if (users.password !== payload.password) {
//     throw new AppError("email/password are incorrect", 401);
//   }

//   const userToken: string = sign(
//     {
//       email: users.email,
//       admin: users.admin,
//     },
//     process.env.SECRET_KEY!,
//     { subject: users.id.toString(), expiresIn: process.env.EXPIRES_IN! }
//   );

//   return userToken;
// };

// const createUser = async (payload: UserCreate): Promise<User> => {
//   const queryString: string = format(
//     'INSERT INTO  "users" (%I) VALUES (%L) RETURNING * ',
//     Object.keys(payload),
//     Object.values(payload)
//   );

//   const queryresult: UserResulte = await client.query(queryString);

//   return queryresult.rows[0];
// };

// const createDevInfo = async (
//   id: string,
//   payload: DevelopersInfoCreate
// ): Promise<Developers> => {
//   const { developerSince, preferredOS } = payload;

//   const queryString: string = `
//     INSERT INTO "developerInfos" ("developerSince", "preferredOS", "developerId")
//     VALUES ($1, $2, $3)
//     RETURNING *
//   `;

//   const queryResult: QueryResult = await client.query(queryString, [
//     developerSince,
//     preferredOS,
//     id,
//   ]);

//   return queryResult.rows[0];
// };

// const listDev = async (id: string): Promise<Developers> => {
//   const queryList: string = `SELECT
//     "d"."id" AS "developerId",
//     "d"."name" AS "developerName",
//     "d"."email" AS "developerEmail"
//     FROM "developers" AS "d"
//     WHERE "d"."id" = $1`;

//   const queryResult: DevelopersResulte = await client.query(queryList, [id]);

//   return queryResult.rows[0];
// };

// const patchDev = async (
//   id: string,
//   payload: Developers
// ): Promise<Developers> => {
//   const queryString: string = format(
//     `
//     UPDATE "developers"
//     SET (%I) = ROW (%L)
//     WHERE "id" = $1
//     RETURNING *;
//   `,
//     Object.keys(payload),
//     Object.values(payload)
//   );

//   const queryConfig: QueryConfig = {
//     text: queryString,
//     values: [id],
//   };
//   const queryResult: DevelopersResulte = await client.query(queryConfig);

//   return queryResult.rows[0];
// };

// const deleteDev = async (id: string) => {
//   const queryString: string = `
//       DELETE FROM "developers"
//       WHERE "id" = $1
//       RETURNING *;
//     `;

//   const queryConfig: QueryConfig = {
//     text: queryString,
//     values: [id],
//   };

//   const queryResult: DevelopersResulte = await client.query(queryConfig);

//   return queryResult.rows[0];
// };

// export default {
//   login,
//   createUser,
// };
