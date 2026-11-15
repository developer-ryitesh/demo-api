import db from "#db/index.js";

export default class User {
   // Create a new user
   static async create({ email, password }) {
      const sql = `
         INSERT INTO users (email, password)
         VALUES ($1, $2)
         RETURNING id
      `;

      const { rows } = await db.query(sql, [email, password]);

      return rows[0];
   }

   // Find all users
   static async findAll() {
      const sql = `
      SELECT
         u.id AS user_id,
         u.email,
         u.role,
         u.created_at,
         p.id AS profile_id,
         p.first_name,
         p.last_name
      FROM users AS u
      LEFT JOIN profiles AS p
         ON u.id = p.user_id
      ORDER BY u.id DESC
   `;

      const { rows } = await db.query(sql);

      return rows.map(({ user_id, profile_id, first_name, last_name, ...user }) => ({
         id: user_id,
         ...user,
         profile: profile_id
            ? {
                 id: profile_id,
                 first_name,
                 last_name,
              }
            : null,
      }));
   }
   // Find user by ID
   static async findById(userId) {
      const sql = `
      SELECT
         u.id AS user_id,
         u.email,
         u.created_at,
         u.role,
         p.id AS profile_id,
         p.first_name,
         p.last_name
      FROM users AS u
      LEFT JOIN profiles AS p
         ON u.id = p.user_id
      WHERE u.id = $1
      LIMIT 1
   `;

      const { rows } = await db.query(sql, [userId]);

      if (!rows.length) return null;

      const { user_id, profile_id, first_name, last_name, ...user } = rows[0];
      return {
         id: user_id,
         ...user,
         profile: profile_id
            ? {
                 first_name,
                 last_name,
              }
            : null,
      };
   }

   // Find user by email
   static async findByEmail(email) {
      const sql = `
         SELECT id, email, password
         FROM users
         WHERE email = $1
         LIMIT 1
      `;

      const { rows } = await db.query(sql, [email]);

      return rows[0] ?? null;
   }

   // Delete user by ID
   static async deleteById(id) {
      const sql = `
         DELETE FROM users
         WHERE id = $1
         RETURNING id
      `;
      const { rows } = await db.query(sql, [id]);
      return rows.length > 0;
   }
}
