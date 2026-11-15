import createHttpError from "http-errors";
import JWT from "#libs/jwt/index.js";
import User from "#models/user.model.js";

/**
 * Authentication middleware
 * @param {string[]} requiredRoles
 * @returns {import("express").RequestHandler}
 */
export default function auth(requiredRoles = []) {
   return async (req, res, next) => {
      try {
         const authHeader = req.headers.authorization;
         const accessToken = req.cookies?.accessToken || authHeader?.match(/^Bearer\s+(.+)$/i)?.[1];

         if (!accessToken) {
            throw createHttpError.Unauthorized("You are unauthorized. Please login.");
         }

         const payload = await JWT.verifyToken(accessToken);

         if (!payload?.id) {
            throw createHttpError.Unauthorized("Invalid authentication token.");
         }
         const user = await User.findById(payload.id);
         if (!user) {
            throw createHttpError.Unauthorized("User not found.");
         }
         if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
            throw createHttpError.Forbidden("You do not have permission to access this resource.");
         }
         req.user = user;
         return next();
      } catch (error) {
         if (error.name === "TokenExpiredError") {
            return next(createHttpError.Unauthorized("Token has expired. Please login again."));
         }
         if (error.name === "JsonWebTokenError") {
            return next(createHttpError.Unauthorized("Invalid authentication token."));
         }
         return next(error);
      }
   };
}
