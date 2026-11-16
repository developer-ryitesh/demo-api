import db from "#db/index.js";
import createHttpError from "http-errors";

export default class User {
   // Create a new user
   static async create({ email, password }) {
      try {
         const sql = `
            INSERT INTO users (email, password)
            VALUES ($1, $2)
            RETURNING id
         `;
         const { rows } = await db.query(sql, [email, password]);
         return rows[0];
      } catch (error) {
         throw createHttpError.InternalServerError(error.message);
      }
   }

   // Find all users
   static async findAll() {
      try {
         const sql = `
            SELECT
               u.id AS user_id,
               u.email,
               u.role,
               u.created_at,
               u.is_active,
               u.is_verified,
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
      } catch (error) {
         throw createHttpError.InternalServerError(error.message);
      }
   }

   // Find user by ID
   static async findById(userId) {
      try {
         const sql = `
            SELECT
               u.id AS user_id,
               u.email,
               u.password,
               u.created_at,
               u.role,
               u.is_active,
               u.is_verified,
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
            profile: profile_id ? { first_name, last_name } : null,
         };
      } catch (error) {
         throw createHttpError.InternalServerError(error.message);
      }
   }

   // Find user by email
   static async findByEmail(email) {
      try {
         const sql = `
            SELECT id, email, password
            FROM users
            WHERE email = $1
            LIMIT 1
         `;
         const { rows } = await db.query(sql, [email]);
         return rows[0] ?? null;
      } catch (error) {
         throw createHttpError.InternalServerError(error.message);
      }
   }

   static async updateActiveStatus({ id, is_active }) {
      try {
         const sql = `
         UPDATE users
         SET is_active = $1
         WHERE id = $2
         RETURNING id, is_active
      `;

         const { rows } = await db.query(sql, [is_active, id]);
         return rows[0] ?? null;
      } catch (error) {
         throw createHttpError.InternalServerError(error.message);
      }
   }

   // Delete user by ID
   static async deleteById(id) {
      try {
         const sql = `
            DELETE FROM users
            WHERE id = $1
            RETURNING id
         `;
         const { rows } = await db.query(sql, [id]);
         return rows.length > 0;
      } catch (error) {
         throw createHttpError.InternalServerError(error.message);
      }
   }

   // Update password
   static async updatePassword({ id, password }) {
      try {
         const sql = `
            UPDATE users
            SET password = $1
            WHERE id = $2
            RETURNING id
         `;

         return await db.query(sql, [password, id]);
      } catch (error) {
         throw createHttpError.InternalServerError(error.message);
      }
   }
}
