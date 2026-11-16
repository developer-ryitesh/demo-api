import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalError from "#/middlewares/error.middleware.js";
import createHttpError from "http-errors";
import appRoutes from "./routes.js";
import swaggerSetup from "../../docs/index.js";
import { renderView } from "#libs/view/index.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api-docs", ...swaggerSetup());
app.use("/api/v1", appRoutes());
renderView(app);
app.use(async (req, res, next) => next(createHttpError.NotFound()));
app.use(globalError);
export default app;
