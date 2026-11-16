import db from "#db/index.js";
import bcrypt from "bcrypt";

export default async function UserSeed() {
   try {
      console.log("Seeding users...");

      // Create ENUM type safely
      await db.query(`
         DO $$ BEGIN
            CREATE TYPE user_role AS ENUM ('USER', 'ADMIN');
         EXCEPTION
            WHEN duplicate_object THEN NULL;
         END $$;
      `);

      // Create users table
      await db.query(`
         CREATE TABLE IF NOT EXISTS users (
            id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            role user_role DEFAULT 'USER',
            is_active BOOLEAN NOT NULL DEFAULT TRUE,
            is_verified BOOLEAN NOT NULL DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
         )
      `);

      const users = [
         ["ritesh@gmail.com", "Root@123", "USER"],
         ["rahul@gmail.com", "Root@123", "USER"],
         ["amit@gmail.com", "Root@123", "USER"],
         ["admin@gmail.com", "Root@123", "ADMIN"],
         ["developer.ritesh@gmail.com", "Root@123", "USER"],
      ];

      for (const [email, password, role] of users) {
         const hashedPassword = await bcrypt.hash(password, 12);

         await db.query(
            `
               INSERT INTO users (email, password, role)
               VALUES ($1, $2, $3)
               ON CONFLICT (email)
               DO NOTHING
            `,
            [email, hashedPassword, role],
         );
      }

      console.log("Users seeded successfully!");
   } catch (error) {
      console.error("User seeding failed:", error.message);
      throw error;
   }
}
