export const pick = (source, fields) => Object.fromEntries(fields.map((field) => [field, source[field]]));
