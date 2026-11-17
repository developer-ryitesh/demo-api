import hbs from "nodemailer-express-handlebars";
type TemplateName = "welcome.mail" | "account-status.mail" | "forgot-password.mail";

interface IEmailOptions {
   to: string | string[];
   cc?: string | string[];
   bcc?: string | string[];
   subject?: string;
   from?: string;
   template?: TemplateName;
   data?: Record<string, any>;
   html?: string;
   text?: string;
}

interface IHbsOptions extends hbs.NodemailerExpressHandlebarsOptions {}

export type { IEmailOptions, IHbsOptions };
