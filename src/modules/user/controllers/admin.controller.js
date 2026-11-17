import validate from "#libs/zod/index.js";
import AdminService from "../services/admin.service.js";
import { activationSchema } from "../validation/user.validation.js";

export default class AdminController {
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
