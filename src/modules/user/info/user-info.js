import User from "#models/user.model.js";

export async function getUserInfo(req, res, next) {
   try {
      const result = await User.findById(req.params.id);
      res.status(200).json({
         success: true,
         message: "User fetched successfully",
         data: result,
      });
   } catch (error) {
      next(error);
   }
}
