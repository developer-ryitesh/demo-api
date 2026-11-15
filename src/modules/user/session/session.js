import createHttpError from "http-errors";

/** @type {import("express").RequestHandler} */
export default async function session(req, res, next) {
   try {
      res.status(200).json({
         success: true,
         message: "user fetched successfully",
         data: req.user,
      });
   } catch (error) {
      next(createHttpError.InternalServerError(error));
   }
}
