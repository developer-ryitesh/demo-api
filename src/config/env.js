import dotenv from "dotenv";
dotenv.config();

const ENV = {
   PORT: process.env.PORT || 3000,
   IS_PRODUCTION: process.env.NODE_ENV === "production",
   get SERVER_URL() {
      return this.IS_PRODUCTION ? process.env.PRODUCTION_URL : `http://localhost:${this.PORT}`;
   },
   //DB
   DB_HOST: process.env.DB_HOST,
   DB_USER: process.env.DB_USER,
   DB_PASSWORD: process.env.DB_PASSWORD,
   DB_NAME: process.env.DB_NAME,
   DB_PORT: Number(process.env.DB_PORT || 5432),
   //JWT
   JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
   REFRESH_TOKEN_EXPIRES_IN: String(process.env.REFRESH_TOKEN_EXPIRES_IN),
   ACCESS_TOKEN_EXPIRES_IN: String(process.env.ACCESS_TOKEN_EXPIRES_IN),

   //MAIL
   SMPT_HOST: process.env.SMPT_HOST,
   SMPT_PORT: Number(process.env.SMPT_PORT),
   SMPT_SERVICE: process.env.SMPT_SERVICE,
   SMPT_MAIL: process.env.SMPT_MAIL,
   SMPT_PASSWORD: process.env.SMPT_PASSWORD,
   ALLOW_ORIGINS: process.env.ALLOW_ORIGINS,
};

export default ENV;
