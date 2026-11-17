import ENV from "#config/env.js";
import JWT from "#libs/jwt/index.js";
import User from "#repositories/user.repositorie.js";
import { compare, genSalt, hash } from "bcrypt";
import createHttpError from "http-errors";

export default class AuthService {
   static async register({ email, password }) {
      const isUserExist = await User.findByEmail(email);
      if (isUserExist) {
         throw createHttpError.BadRequest("email already exists!");
      }
      const salt = await genSalt();
      const hashedPassword = await hash(password, salt);
      await User.create({ email, password: hashedPassword });
      return null;
   }

   static async login({ email, password }) {
      const user = await User.findByEmail(email);
      if (!user) {
         throw createHttpError.NotFound("User not found");
      }
      const match = await compare(password, user.password);
      if (!match) {
         throw createHttpError.Unauthorized();
      }
      const accessToken = JWT.createToken({
         data: { id: user?.id },
         exp: ENV.ACCESS_TOKEN_EXPIRES_IN,
      });
      const refreshToken = JWT.createToken({
         data: { id: user.id },
         exp: ENV.REFRESH_TOKEN_EXPIRES_IN,
      });
      return { accessToken, refreshToken };
   }

   static async refreshToken({ refreshToken }) {
      if (!refreshToken) {
         throw createHttpError.NotFound("Refresh token not found");
      }
      const token = await JWT.verifyToken(refreshToken);
      const user = await User.findById(token.id);
      if (!user) {
         throw createHttpError.Unauthorized();
      }
      const accessToken = JWT.createToken({
         data: { id: user.id },
         exp: ENV.ACCESS_TOKEN_EXPIRES_IN,
      });
      return { accessToken };
   }
}
