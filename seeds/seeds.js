import db from "#db/index.js";
import dotenv from "dotenv";
import UserSeed from "./users/user.seed.js";
dotenv.config({ path: "../.env" });

async function seed() {
   try {
      console.log("Seeding started...");
      // Create users table / seed users first
      await UserSeed();

      // Create profiles table
      await db.query(`
         CREATE TABLE IF NOT EXISTS profiles (
            profile_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            user_id INTEGER NOT NULL UNIQUE,

            CONSTRAINT fk_profile_user
               FOREIGN KEY (user_id)
               REFERENCES users(id)
               ON DELETE CASCADE
               ON UPDATE CASCADE
         )
      `);

      console.log("Seeding completed successfully!");
   } catch (error) {
      console.error("Seeding failed:", error.message);
      process.exitCode = 1;
   } finally {
      await db.end();
   }
}

seed();
