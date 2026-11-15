import { Router } from "express";
import session from "./session/session.js";
import auth from "#middlewares/auth.middleware.js";
import logout from "./logout/logout.js";
import Profile from "./profile/profile.js";
import { deleteUser } from "./delete-user/delete-user.js";
import { getUsers } from "./users/users.js";
import { updatePassword } from "./update-password/update-password.js";
import { getUserInfo } from "./info/user-info.js";

export default function userRoutes() {
   const routes = Router();
   routes.get("/all", auth(["ADMIN"]), getUsers);
   routes.get("/logout", auth(["ADMIN", "USER"]), logout);
   routes.get("/session", auth(["ADMIN", "USER"]), session);
   routes.post("/profile", auth(["ADMIN", "USER"]), Profile.create);
   routes.put("/update-password", auth(["ADMIN", "USER"]), updatePassword);
   routes.get("/:id", auth(["ADMIN"]), getUserInfo);
   routes.delete("/:id", auth(["ADMIN"]), deleteUser);
   return routes;
}
