import createHttpError from "http-errors";
import User from "#models/user.model.js";
import { compare } from "bcrypt";
import JWT from "#libs/jwt/index.js";
import httpCookie from "#libs/cookie/index.js";
import ENV from "#config/env.js";
import { z } from "zod";
import validate from "#libs/zod/index.js";

const loginSchema = z
   .object({
      email: z.string().email("Invalid email format"),
      password: z.string().min(6, "Password must be at least 6 characters"),
   })
   .strict();

/** @type {import("express").RequestHandler} */
export default async function login(req, res, next) {
   try {
      const body = validate(loginSchema, req.body);
      const user = await User.findByEmail(body.email);
      if (!user) {
         throw createHttpError.NotFound("User not found");
      }
      const match = await compare(body.password, user.password);
      if (!match) {
         throw createHttpError.Unauthorized();
      }
      const accessToken = JWT.createToken({
         data: { id: user?.id },
         exp: ENV.ACCESS_TOKEN_EXPIRES_IN,
      });
      const refreshToken = JWT.createToken({
         data: { id: user.id },
         exp: ENV.REFRESH_TOKEN_EXPIRES_IN,
      });
      const cookie = httpCookie(res);
      cookie.set({ refreshToken });
      res.status(200).json({
         success: true,
         message: "login successfully",
         data: { accessToken },
      });
   } catch (error) {
      next(error);
   }
}
