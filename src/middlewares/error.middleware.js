export default function globalError(err, req, res, next) {
   const statusCode = err.status || 500;
   const message = err.message || "Internal Server Error";

   res.status(statusCode).json({
      success: false,
      error: {
         status: statusCode,
         message,
      },
   });
}
