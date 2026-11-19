import ENV from "#config/env.js";

export default function httpCookie(res) {
   const expires = (duration) => {
      const [valueStr, unit] = duration.split("-");
      const value = Number(valueStr);

      if (!Number.isFinite(value) || value <= 0) {
         throw new Error("Invalid duration value");
      }

      const unitMs = {
         d: 24 * 60 * 60 * 1000,
         h: 60 * 60 * 1000,
         m: 60 * 1000,
         s: 1000,
      };

      const ms = unitMs[unit];

      if (!ms) {
         throw new Error("Invalid duration unit. Use d, h, m, or s.");
      }

      return new Date(Date.now() + value * ms);
   };

   const options = (expiresAt) => {
      return {
         httpOnly: true,
         secure: ENV.IS_PRODUCTION,
         sameSite: ENV.IS_PRODUCTION ? "none" : "lax",
         ...(expiresAt && { expires: expiresAt }),
      };
   };

   const set = (cookies) => {
      const expiresAt = expires(ENV.REFRESH_TOKEN_EXPIRES_IN);
      for (const [key, value] of Object.entries(cookies)) {
         res.cookie(key, value, options(expiresAt));
      }
   };

   const remove = (key) => {
      res.clearCookie(key, options());
   };

   return { set, remove };
}
