import validate from "#libs/zod/index.js";
import User from "#models/user.model.js";
import createHttpError from "http-errors";
import { z } from "zod";

const activationSchema = z
   .object({
      user_id: z.coerce //
         .number("user_id is required")
         .int("user_id must be an integer")
         .positive("user_id must be greater than 0"),
         
      is_active: z.boolean({
         error: (issue) => (issue.input === undefined ? "is_active is required" : "is_active must be a boolean"),
      }),
   })
   .strict();

/** @type {import("express").RequestHandler} */
export default async function activation(req, res, next) {
   try {
      const body = validate(activationSchema, req.body);
      if (body.user_id === req.user.id) {
         throw createHttpError.BadRequest("You cannot activate/deactivate your own account.");
      }
      const result = await User.updateActiveStatus({
         id: body.user_id,
         is_active: body.is_active,
      });
      if (!result) {
         throw createHttpError.NotFound("User not found");
      }
      console.log("User activation result:", result);
      res.status(200).json({
         success: true,
         message: `User ${body.is_active ? "activated" : "deactivated"} successfully`,
      });
   } catch (error) {
      next(error);
   }
}
