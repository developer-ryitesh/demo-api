import { Router } from "express";
import { getUsers, getUserInfo, deleteUser } from "./users/users.js";
import session from "./session/session.js";
import auth from "#middlewares/auth.middleware.js";
import logout from "./logout/logout.js";
import Profile from "./profile/profile.js";

export default function userRoutes() {
   const routes = Router();
   routes.get("/all", auth(["ADMIN"]), getUsers);
   routes.get("/session", auth(["ADMIN", "USER"]), session);
   routes.post("/profile", auth(["USER", "ADMIN"]), Profile.create);
   routes.get("/:id", auth(["ADMIN"]), getUserInfo);
   routes.delete("/:id", auth(["ADMIN"]), deleteUser);
   routes.get("/logout", auth(["USER", "ADMIN"]), logout);
   return routes;
}
