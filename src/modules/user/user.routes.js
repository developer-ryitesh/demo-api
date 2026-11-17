import { Router } from "express";
import auth from "#middlewares/auth.middleware.js";
import UserController from "./controllers/user.controller.js";
import AdminController from "./controllers/admin.controller.js";

export default function userRoutes() {
   const routes = Router();
   // user routes
   routes.get("/session", auth(["ADMIN", "USER"]), UserController.session);
   routes.post("/logout", auth(["ADMIN", "USER"]), UserController.logout);
   routes.post("/profile", auth(["ADMIN", "USER"]), UserController.updateProfile);
   routes.put("/update-password", auth(["ADMIN", "USER"]), UserController.updatePassword);

   // Admin routes
   routes.get("/all", auth(["ADMIN"]), AdminController.getUsers);
   routes.patch("/activation", auth(["ADMIN"]), AdminController.activation);
   routes.post("/invite", [auth(["ADMIN"])], AdminController.inviteUser);
   routes.get("/:id", auth(["ADMIN"]), AdminController.getUserInfo);
   routes.delete("/:id", auth(["ADMIN"]), AdminController.deleteUser);
   return routes;
}
