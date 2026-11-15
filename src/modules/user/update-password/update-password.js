import { z } from "zod";
import validate from "#libs/zod/index.js";
import createHttpError from "http-errors";
import User from "#models/user.model.js";
import { compare, hash } from "bcrypt";

const updatePasswordSchema = z
   .object({
      oldPassword: z.string("oldPassword is required"),
      newPassword: z.string("newPassword is required").min(8, "Password must be at least 8 characters"),
   })
   .strict();

export async function updatePassword(req, res, next) {
   try {
      const body = validate(updatePasswordSchema, req.body);
      const user = await User.findById(req.user.id);
      const isMatch = await compare(body.oldPassword, user?.password);
      if (!isMatch) {
         throw createHttpError.BadRequest("Old password is incorrect");
      }
      const hashedNewPassword = await hash(body.newPassword, 10);
      await User.updatePassword({
         id: req.user.id,
         password: hashedNewPassword,
      });
      res.status(200).json({
         success: true,
         message: "Password updated successfully",
      });
   } catch (error) {
      next(error);
   }
}
