import createHttpError from "http-errors";
import User from "#models/user.model.js";
import { compare } from "bcrypt";
import JWT from "#libs/jwt/index.js";
import httpCookie from "#libs/cookie/index.js";
import ENV from "#config/env.js";

/** @type {import("express").RequestHandler} */
export default async function login(req, res, next) {
   try {
      const body = req.body;
      const user = await User.findByEmail(body.email);
      if (!user) {
         return next(createHttpError.NotFound("User not found"));
      }
      const match = await compare(body.password, user.password);
      if (!match) {
         return next(createHttpError.Unauthorized());
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
      next(createHttpError.InternalServerError(error));
   }
}
