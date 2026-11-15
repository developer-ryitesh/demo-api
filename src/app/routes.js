import pkg from "../../package.json" with { type: "json" };
import { Router } from "express";
import authRoutes from "#/modules/auth/auth.routes.js";
import userRoutes from "#/modules/user/user.routes.js";

export default function appRoutes() {
   const routes = Router();
   routes.get("/", (req, res, next) => {
      res.status(200).json({
         message: "info route",
         data: { name: pkg.name, version: pkg.version, status: "running" },
         success: true,
      });
   });
   routes.use("/auth", authRoutes());
   routes.use("/user", userRoutes());
   return routes;
}
