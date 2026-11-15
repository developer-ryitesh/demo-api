import ENV from "#config/env.js";
import JWT from "#libs/jwt/index.js";
import User from "#models/user.model.js";
import createHttpError from "http-errors";

/** @type {import("express").RequestHandler} */
export default async function refreshToken(req, res, next) {
   try {
      const refreshToken = req.cookies?.refreshToken;
      if (!refreshToken) {
         return next(createHttpError.NotFound("Refresh token not found"));
      }
      const token = await JWT.verifyToken(refreshToken);
      const user = await User.findById(token.id);
      if (!user) {
         return next(createHttpError.Unauthorized());
      }
      const accessToken = JWT.createToken({
         data: { id: user.id },
         exp: ENV.ACCESS_TOKEN_EXPIRES_IN,
      });
      res.status(200).json({
         success: true,
         message: "Reauth successfully",
         data: { accessToken },
      });
   } catch (error) {
      next(createHttpError.InternalServerError(error));
   }
}
