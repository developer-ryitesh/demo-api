import { getDirname } from "#utils/utils.js";
import path from "node:path";
import fs from "node:fs";
import express from "express";

export function renderView(app) {
   const __dirname = getDirname(import.meta.url);

   const frontend = path.resolve(__dirname, "../../view");
   if (fs.existsSync(path.join(frontend, "index.html"))) {
      app.use(express.static(frontend));
      app.get(/^\/(?!api).*/, (req, res) => res.sendFile(path.join(frontend, "index.html")));
   }
}
