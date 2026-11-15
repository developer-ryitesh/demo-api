import User from "#models/user.model.js";
import createHttpError from "http-errors";

export async function deleteUser(req, res, next) {
   try {
      const user = await User.findById(req.params.id);
      if (!user) {
         throw createHttpError.NotFound("User not found");
      }
      const result = await User.deleteById(req.params.id);
      res.status(200).json({
         success: true,
         message: "User deleted successfully",
         data: result,
      });
   } catch (error) {
      next(error);
   }
}
