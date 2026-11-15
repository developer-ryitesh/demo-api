import createHttpError from "http-errors";
import User from "#models/user.model.js";
import { genSalt, hash } from "bcrypt";

/** @type {import("express").RequestHandler} */
export default async function register(req, res, next) {
   try {
      const body = req.body;
      const isUserExist = await User.findByEmail(body.email);
      if (isUserExist) {
         return next(createHttpError.BadRequest("email already exists!"));
      }
      const salt = await genSalt();
      const hashedPassword = await hash(body.password, salt);
      await User.create({
         email: body.email,
         password: hashedPassword,
      });
      res.status(201).json({
         success: true,
         message: "Users register successfully",
      });
   } catch (error) {
      next(createHttpError.InternalServerError(error));
   }
}
