import { Router } from "express";
import register from "./register/register.js";
import login from "./login/login.js";
import refreshToken from "./refresh-token/refresh-token.js";

export default function authRoutes() {
   const routes = Router();
   routes.post("/register", register);
   routes.post("/login", login);
   routes.get("/refresh-token", refreshToken);
   return routes;
}
