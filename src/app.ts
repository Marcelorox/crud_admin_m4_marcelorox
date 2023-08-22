import express, { Application, json } from "express";
import { startDatabase } from "./database";
import { usersRoutes } from "./routers";

const app: Application = express();
app.use(json());

app.use("/users", usersRoutes);

export default app;
