import path from "node:path";
import { fileURLToPath } from "node:url";

export const pick = (source, fields) => Object.fromEntries(fields.map((field) => [field, source[field]]));

export function getDirname(metaUrl) {
   return path.dirname(fileURLToPath(metaUrl));
}

export function getFilename(metaUrl) {
   return fileURLToPath(metaUrl);
}
