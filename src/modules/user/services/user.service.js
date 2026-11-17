import createHttpError from "http-errors";
import { compare, hash } from "bcrypt";
import Profile from "#repositories/profile.repositorie.js";
import User from "#repositories/user.repositorie.js";

export default class UserService {
   static async session(user) {
      return user;
   }

   static async updateProfile({ user_id, first_name, last_name }) {
      return Profile.update({
         user_id,
         first_name,
         last_name,
      });
   }

   static async updatePassword({ user_id, old_password, new_password }) {
      const user = await User.findById(user_id);

      if (!user) {
         throw createHttpError.NotFound("User not found");
      }

      const isMatch = await compare(old_password, user.password);

      if (!isMatch) {
         throw createHttpError.BadRequest("Old password is incorrect");
      }

      const hashedPassword = await hash(new_password, 10);

      await User.updatePassword({
         id: user_id,
         password: hashedPassword,
      });

      return true;
   }
}
