import postmanToOpenApi from "postman-to-openapi";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputFile = path.resolve(__dirname, "../postman/collection.json");

const outputFile = path.resolve(__dirname, "../swagger.yaml");

async function generateSwagger() {
   try {
      // Check file exists
      if (!fs.existsSync(inputFile)) {
         throw new Error("Postman collection file not found!");
      }

      // Validate JSON
      const rawData = fs.readFileSync(inputFile, "utf-8");

      console.log("Collection preview:", rawData.slice(0, 100));

      const collection = JSON.parse(rawData);

      if (!collection.info || !Array.isArray(collection.item)) {
         throw new Error("Invalid Postman Collection!");
      }

      await postmanToOpenApi(inputFile, outputFile, {
         defaultTag: "General",
         outputFormat: "yaml",
      });

      console.log("Swagger documentation generated!");
      console.log("Output:", outputFile);
   } catch (error) {
      console.error("Swagger generation failed:", error.message);
      process.exitCode = 1;
   }
}

generateSwagger();
