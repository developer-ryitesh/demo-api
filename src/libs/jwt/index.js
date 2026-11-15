import jsonwebtoken from "jsonwebtoken";
import ENV from "#config/env.js";

export default class JWT {
   static createToken = ({ data, exp }) => {
      const expiresIn = String(exp)?.replace("-", "");
      const token = jsonwebtoken.sign(data, ENV.JWT_SECRET_KEY, {
         expiresIn: expiresIn,
      });
      return token;
   };

   static verifyToken = async (token) => {
      try {
         const verify = jsonwebtoken.verify(token, ENV.JWT_SECRET_KEY);
         return verify;
      } catch (error) {
         throw error;
      }
   };
}
