import createHttpError from "http-errors";
import User from "#repositories/user.repositorie.js";
import { genSalt, hash } from "bcrypt";

export default class AdminService {
   static async getUsers() {
      return User.findAll();
   }

   static async getUserInfo(id) {
      const user = await User.findById(id);
      if (!user) {
         throw createHttpError.NotFound("User not found");
      }
      return user;
   }

   static async activation({ user_id, admin_id, is_active }) {
      if (user_id === admin_id) {
         throw createHttpError.BadRequest("You cannot activate/deactivate your own account.");
      }
      const result = await User.updateActiveStatus({
         id: user_id,
         is_active,
      });

      if (!result) {
         throw createHttpError.NotFound("User not found");
      }
      return result;
   }

   static async inviteUser({ email, password }) {
      const user = await User.findByEmail(email);
      if (user) {
         throw createHttpError.BadRequest("User already exists");
      }
      const salt = await genSalt();
      const hashedPassword = await hash(password, salt);
      const result = await User.inviteUser({
         email: email,
         password: hashedPassword,
      });
      return result;
   }

   static async deleteUser(id) {
      const user = await User.deleteById(id);
      if (!user) {
         throw createHttpError.NotFound("User not found");
      }
      return user;
   }
}
