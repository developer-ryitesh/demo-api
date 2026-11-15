import createHttpError from "http-errors";
import User from "#models/user.model.js";
import { genSalt, hash } from "bcrypt";
import { z } from "zod";
import validate from "#libs/zod/index.js";

const registerSchema = z
   .object({
      email: z //
         .string("Email is required!")
         .email("Invalid email address"),

      password: z //
         .string("Password is required")
         .min(8, "Password must be at least 8 characters"),

      confirm_password: z //
         .string("Confirm password is required"),
   })
   .refine((data) => data.password === data.confirm_password, {
      message: "Passwords do not match",
      path: ["confirm_password"],
   })
   .strict();

/** @type {import("express").RequestHandler} */
export default async function register(req, res, next) {
   try {
      const body = validate(registerSchema, req.body);
      const isUserExist = await User.findByEmail(body.email);
      if (isUserExist) {
         throw createHttpError.BadRequest("email already exists!");
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
      next(error);
   }
}
