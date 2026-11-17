import nodemailer from "nodemailer";
import path from "node:path";
import ejs from "ejs";
import ENV from "#config/env.js";

class Mail {
   transporter = nodemailer.createTransport({
      host: ENV.SMPT_HOST,
      port: ENV.SMPT_PORT,
      auth: {
         user: ENV.SMPT_MAIL,
         pass: ENV.SMPT_PASSWORD,
      },
   });

   renderTemplate = (template, data = {}) => {
      const filePath = path.join(process.cwd(), "src/libs/mail/templates", `${template}.ejs`);
      return ejs.renderFile(filePath, data);
   };

   send = async (options) => {
      const html = options.template ? await this.renderTemplate(options.template, options.data) : options.html;
      return this.transporter.sendMail({
         from: ENV.SMPT_MAIL,
         to: options.to,
         subject: options.subject,
         html,
         text: options.text,
      });
   };
}

export default new Mail();
