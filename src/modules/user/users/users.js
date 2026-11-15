import createHttpError from "http-errors";
import User from "#models/user.model.js";

/** @type {import("express").RequestHandler} */
export async function getUsers(req, res, next) {
   try {
      const result = await User.findAll();
      res.status(200).json({
         success: true,
         message: "Users fetched successfully",
         data: result,
      });
   } catch (error) {
      next(createHttpError.InternalServerError(error));
   }
}

export async function getUserInfo(req, res, next) {
   try {
      const result = await User.findById(req.params.id);
      res.status(200).json({
         success: true,
         message: "User fetched successfully",
         data: result,
      });
   } catch (error) {
      next(createHttpError.InternalServerError(error));
   }
}

export async function deleteUser(req, res, next) {
   try {
      const user = await User.findById(req.params.id);
      if (!user) {
         return next(createHttpError.NotFound("User not found"));
      }
      const result = await User.deleteById(req.params.id);
      res.status(200).json({
         success: true,
         message: "User deleted successfully",
         data: result,
      });
   } catch (error) {
      next(createHttpError.InternalServerError(error));
   }
}
