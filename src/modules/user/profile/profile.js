import ProfileModel from "#models/profile.model.js";

export default class Profile {
   /** @type {import("express").RequestHandler} */
   static async create(req, res, next) {
      try {
         const data = await ProfileModel.create({
            user_id: req.user.id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
         });
         res.status(201).json({
            success: true,
            message: "Profile updated successfully",
            data,
         });
      } catch (error) {
         next(error);
      }
   }
}
