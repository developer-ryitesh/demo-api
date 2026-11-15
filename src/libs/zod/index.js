import createHttpError from "http-errors";

export default function validate(schema, payload) {
   const result = schema.safeParse(payload);
   if (!result.success) {
      const message = result.error?.issues?.[0]?.message || "Invalid payload";
      throw createHttpError.BadRequest(message);
   }
   return result.data;
}

//export type Zod<T> = z.infer<T>;
