import dotenv from "dotenv";
dotenv.config();

const ENV = {
   PORT: process.env.PORT,
   get SERVER_URL() {
      return `http://localhost:${this.PORT}`;
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
};

export default ENV;
