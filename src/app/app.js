import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalError from "#/middlewares/error.middleware.js";
import createHttpError from "http-errors";
import appRoutes from "./routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", appRoutes());
app.use(async (req, res, next) => next(createHttpError.NotFound()));
app.use(globalError);
export default app;
