import http from "http";
import ENV from "#config/env.js";
import app from "#app/app.js";

const PORT = ENV.PORT || 3000;
const server = http.createServer(app);

server.listen(PORT, () => {
   console.log(`Server listening on http://localhost:${PORT}/api/v1`);
});

// // Graceful shutdown
// const shutdown = (signal) => {
//    console.log(`Received ${signal}, shutting down...`);
//    server.close(() => {
//       console.log("HTTP server closed.");
//       process.exit(0);
//    });
//    // force exit after 10s
//    setTimeout(() => {
//       console.error("Forcing shutdown.");
//       process.exit(1);
//    }, 10_000).unref();
// };
// process.on("SIGINT", () => shutdown("SIGINT"));
// process.on("SIGTERM", () => shutdown("SIGTERM"));
