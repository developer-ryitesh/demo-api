import createHttpError from "http-errors";
import User from "#repositories/user.repositorie.js";

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

   static async deleteUser(id) {
      const user = await User.deleteById(id);
      if (!user) {
         throw createHttpError.NotFound("User not found");
      }
      return user;
   }
}
