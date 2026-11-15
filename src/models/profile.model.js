import db from "#db/index.js";

export default class ProfileModel {
   static async create({ user_id, first_name, last_name }) {
      const result = await db.query(
         `
            INSERT INTO profiles (
               first_name,
               last_name,
               user_id
            )
            VALUES ($1, $2, $3)
            ON CONFLICT (user_id)
            DO UPDATE SET
               first_name = EXCLUDED.first_name,
               last_name = EXCLUDED.last_name
            RETURNING id
         `,
         [first_name, last_name, user_id],
      );

      return result.rows[0].id;
   }
}
