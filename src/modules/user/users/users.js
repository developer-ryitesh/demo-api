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
      next(error);
   }
}
