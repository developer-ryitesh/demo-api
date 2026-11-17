import httpCookie from "#libs/cookie/index.js";
import validate from "#libs/zod/index.js";
import AuthService from "../services/auth.service.js";
import { loginSchema, registerSchema } from "../validation/auth.validation.js";

export default class AuthController {
   /** @type {import("express").RequestHandler} */
   static async register(req, res, next) {
      try {
         const body = validate(registerSchema, req.body);
         await AuthService.register({
            email: body.email,
            password: body.password,
         });
         res.status(201).json({
            success: true,
            message: "Users register successfully",
         });
      } catch (error) {
         next(error);
      }
   }

   /** @type {import("express").RequestHandler} */
   static async login(req, res, next) {
      try {
         console.log(req.body);
         const body = validate(loginSchema, req.body);
         const result = await AuthService.login({
            email: body.email,
            password: body.password,
         });
         const cookie = httpCookie(res);
         cookie.set({ refreshToken: result.refreshToken });
         res.status(200).json({
            success: true,
            message: "login successfully",
            data: { accessToken: result.accessToken },
         });
      } catch (error) {
         next(error);
      }
   }

   /** @type {import("express").RequestHandler} */
   static async refreshToken(req, res, next) {
      try {
         const refreshToken = req.cookies?.refreshToken;
         const result = await AuthService.refreshToken({ refreshToken });
         res.status(200).json({
            success: true,
            message: "Reauth successfully",
            data: { accessToken: result.accessToken },
         });
      } catch (error) {
         next(error);
      }
   }
}
