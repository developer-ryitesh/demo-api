import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "node:path";
import ENV from "#config/env.js";
import { getDirname } from "#utils/utils.js";

export default function swaggerSetup() {
   const __dirname = getDirname(import.meta.url);

   const swaggerDocument = YAML.load(path.resolve(__dirname, "./swagger.yaml"));

   swaggerDocument.servers = [
      {
         url: `${ENV.SERVER_URL}/api/v1`,
      },
   ];

   return [swaggerUi.serve, swaggerUi.setup(swaggerDocument)];
}
