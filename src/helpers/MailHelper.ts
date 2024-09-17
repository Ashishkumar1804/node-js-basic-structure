import * as sgMail from '@sendgrid/mail';
import * as handlebars from "handlebars";
import * as path from 'path';
import { env } from '../environments/Env';
import * as fs from 'fs';

export interface MessageInterface {
    to: string,
    from: string,
    subject: string,
    text: string,
    html: string
}

export interface ForgetPasswordInterface {
    email: string,
    name: string,
    otp: string | number
}

class MailHelper {

    private mailFromAddress: string;
    private supportEmailAddress: string;
    private nodeEnv: string;

    constructor() {
        sgMail.setApiKey(env().sendGridApiKey)
        this.mailFromAddress = env().mailFrom;
        this.supportEmailAddress = env().mailTo;
        this.nodeEnv = env().nodeEnv;
    }

    /**
    * Send Email for forget password.
    */
    async forgetPasswordEmail({ email, name, otp }: ForgetPasswordInterface): Promise<boolean> {
        const templateHtml = fs.readFileSync(path.join(process.cwd(), 'src/templates/Forgetpswd.html'), 'utf8');
        console.log(templateHtml);
        const template = handlebars.compile(templateHtml);
        const html = template({ otp: otp, name: name });
        const msg: MessageInterface = {
            to: email, // Change to your recipient
            from: this.mailFromAddress,//'Support@beatup.app', // Change to your verified sender // noreply@beatuptribe.com
            subject: 'One Time Password Mail | Greetings From BuddyPass!!',
            text: 'Your one time password is:',
            html: html
        }
        return await this.sendEmail(msg);
    }

    /**
     * Send Email for forget username.
     */
    async forgetUsernameEmail({ email, name, otp }: ForgetPasswordInterface): Promise<boolean> {
        const templateHtml = fs.readFileSync(path.join(process.cwd(), 'src/templates/Changeusername.html'), 'utf8');
        const template = handlebars.compile(templateHtml);
        const html = template({ otp: otp, name: name });
        const msg: MessageInterface = {
            to: email, // Change to your recipient
            from: this.mailFromAddress,//'Support@beatup.app', // Change to your verified sender // noreply@beatuptribe.com
            subject: 'One Time Password Mail | Greetings From BuddyPass!!',
            text: 'Your one time password is:',
            html: html
        }
        return await this.sendEmail(msg);
    }

    async accountRegistration({ email, name, otp }: ForgetPasswordInterface): Promise<boolean> {
        const templateHtml = fs.readFileSync(path.join(process.cwd(), 'src/templates/Registration.html'), 'utf8');
        const template = handlebars.compile(templateHtml);
        const html = template({ otp: otp, name: name });
        const msg: MessageInterface = {
            to: email, // Change to your recipient
            from: this.mailFromAddress,//'Support@beatup.app', // Change to your verified sender // noreply@beatuptribe.com
            subject: 'One Time Password Mail | Greetings From BuddyPass!!',
            text: 'Your one time password is:',
            html: html
        }
        return await this.sendEmail(msg);
    }

    async unlockAccount({ email, name, otp }: ForgetPasswordInterface): Promise<boolean> {
        const templateHtml = fs.readFileSync(path.join(process.cwd(), 'src/templates/Accountlocked.html'), 'utf8');
        const template = handlebars.compile(templateHtml);
        const html = template({ otp: otp, name: name });
        const msg: MessageInterface = {
            to: email, // Change to your recipient
            from: this.mailFromAddress,//'Support@beatup.app', // Change to your verified sender // noreply@beatuptribe.com
            subject: 'One Time Password Mail | Greetings From BuddyPass!!',
            text: 'Your one time password is:',
            html: html
        }
        return await this.sendEmail(msg);
    }


    async contact({ username, email, subject, text }): Promise<boolean> {
        const templateHtml = fs.readFileSync(path.join(process.cwd(), 'src/templates/support.html'), 'utf8');
        const template = handlebars.compile(templateHtml);
        const html = template({ username, email, text });
        const msg: MessageInterface = {
            to: this.supportEmailAddress,
            from: this.mailFromAddress,
            subject: subject,
            text: text,
            html: html
        }
        return await this.sendEmail(msg);
    }
    private async sendEmail(message: MessageInterface): Promise<boolean> {
        try {
            const res = await sgMail.send(message)
            console.log(res);
            if (res && res[0]?.statusCode == 202) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            console.error("forgetPasswordSendMail", error);
            return false;
        };
    }



}



export default new MailHelper();

