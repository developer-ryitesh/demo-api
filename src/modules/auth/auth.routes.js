import { Router } from "express";
import AuthController from "./controllers/auth.controller.js";

export default function authRoutes() {
   const routes = Router();
   routes.post("/register", AuthController.register);
   routes.post("/login", AuthController.login);
   routes.get("/refresh-token", AuthController.refreshToken);
   return routes;
}
