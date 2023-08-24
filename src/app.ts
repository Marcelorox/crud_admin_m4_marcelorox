import "express-async-errors";
import express, { Application, json } from "express";
import { startDatabase } from "./database";
import { loginRoutes, usersRoutes } from "./routers";
import { errorCheck } from "./middlewares";

const app: Application = express();
app.use(json());

app.use("/users", usersRoutes);
app.use("/login", loginRoutes);
app.use(errorCheck);

export default app;
