import Mail from "#libs/mail/index.js";
import validate from "#libs/zod/index.js";
import User from "#repositories/user.repositorie.js";
import AdminService from "../services/admin.service.js";
import { activationSchema, inviteUserSchema } from "../validations/user.validation.js";

export default class AdminController {
   /** @type {import("express").RequestHandler} */
   static async getUsers(req, res, next) {
      try {
         const result = await AdminService.getUsers();

         res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: result,
         });
      } catch (error) {
         next(error);
      }
   }

   /** @type {import("express").RequestHandler} */
   static async getUserInfo(req, res, next) {
      try {
         const result = await AdminService.getUserInfo(req.params.id);

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
   static async activation(req, res, next) {
      try {
         const body = validate(activationSchema, req.body);

         await AdminService.activation({
            user_id: body.user_id,
            admin_id: req.user.id,
            is_active: body.is_active,
         });

         res.status(200).json({
            success: true,
            message: `User ${body.is_active ? "activated" : "deactivated"} successfully`,
         });
      } catch (error) {
         next(error);
      }
   }

   /** @type {import("express").RequestHandler} */
   static async inviteUser(req, res, next) {
      try {
         const body = validate(inviteUserSchema, req.body);
         const result = await AdminService.inviteUser({
            email: body.email,
            password: body.password,
         });
         try {
            await Mail.send({
               to: [body.email],
               subject: "Welcome Mail",
               template: "welcome.mail",
               data: {
                  email: body.email,
                  password: body.password,
                  action: `http://localhost:3000/auth/login`,
               },
            });
         } catch (error) {
            console.log(error);
         }
         res.status(200).json({
            success: true,
            data: {},
            message: `Invitation sent to ${result.email} successfully!`,
         });
      } catch (error) {
         next(error);
      }
   }

   /** @type {import("express").RequestHandler} */
   static async deleteUser(req, res, next) {
      try {
         const result = await AdminService.deleteUser(req.params.id);

         res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: result,
         });
      } catch (error) {
         next(error);
      }
   }
}
