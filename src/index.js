import http from "http";
import ENV from "#config/env.js";
import app from "#app/app.js";

const server = http.createServer(app);
server.listen(ENV.PORT, () => {
   console.log("___________________________________________\n");
   console.log(`💻 MODE : ${ENV.IS_PRODUCTION ? "PRODUCTION" : "DEVELOPMENT"}`);
   console.log(`🌐 Server : ${ENV.SERVER_URL}/api/v1`);
   console.log(`📌 PORT : ${ENV.PORT}`);
   console.log("___________________________________________\n");
});
