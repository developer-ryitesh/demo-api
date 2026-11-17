import UserService from "../services/user.service.js";
import httpCookie from "#libs/cookie/index.js";
import validate from "#libs/zod/index.js";
import { updatePasswordSchema } from "../validations/user.validation.js";

export default class UserController {
   /** @type {import("express").RequestHandler} */
   static async session(req, res, next) {
      try {
         const result = await UserService.session(req.user);

         res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: result,
         });
      } catch (error) {
         next(error);
      }
   }

   /** @type {import("express").RequestHandler} */
   static async updateProfile(req, res, next) {
      try {
         const result = await UserService.updateProfile({
            user_id: req.user.id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
         });

         res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: result,
         });
      } catch (error) {
         next(error);
      }
   }

   /** @type {import("express").RequestHandler} */
   static async updatePassword(req, res, next) {
      try {
         const body = validate(updatePasswordSchema, req.body);

         await UserService.updatePassword({
            user_id: req.user.id,
            old_password: body.old_password,
            new_password: body.new_password,
         });

         res.status(200).json({
            success: true,
            message: "Password updated successfully",
         });
      } catch (error) {
         next(error);
      }
   }

   /** @type {import("express").RequestHandler} */
   static async logout(req, res, next) {
      try {
         const cookie = httpCookie(res);
         cookie.remove("refreshToken");

         res.status(200).json({
            success: true,
            message: "Logout successfully",
            data: {},
         });
      } catch (error) {
         next(error);
      }
   }
}
