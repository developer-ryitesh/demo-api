import httpCookie from "#libs/cookie/index.js";

/** @type {import("express").RequestHandler} */
export default async function logout(req, res, next) {
   try {
      const cookie = httpCookie(res);
      cookie.remove("refreshToken");

      res.status(200).json({
         message: "logout successfully",
         data: {},
         success: true,
      });
   } catch (error) {
      next(error);
   }
}
