import db from "#db/index.js";
import createHttpError from "http-errors";

export default class ProfileModel {
   static async update({ user_id, first_name, last_name }) {
      try {
         const { rows } = await db.query(`SELECT id FROM profiles WHERE user_id = $1`, [user_id]);

         let result;

         if (rows.length > 0) {
            // Update existing profile
            result = await db.query(`
                  UPDATE profiles
                  SET
                     first_name = COALESCE($1, first_name),
                     last_name = COALESCE($2, last_name)
                  WHERE user_id = $3
                  RETURNING id
               `,
               [first_name ?? null, last_name ?? null, user_id],
            );
         } else {
            // Create new profile
            result = await db.query(
               `
                  INSERT INTO profiles (
                     first_name,
                     last_name,
                     user_id
                  )
                  VALUES ($1, $2, $3)
                  RETURNING id
               `,
               [first_name ?? null, last_name ?? null, user_id],
            );
         }

         return result.rows[0].id;
      } catch (error) {
         throw createHttpError.InternalServerError(error.message);
      }
   }
}
