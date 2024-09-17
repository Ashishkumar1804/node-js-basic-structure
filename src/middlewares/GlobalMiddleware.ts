import * as formidable from 'formidable';
import * as Jwt from 'jsonwebtoken';
import { env } from "../environments/Env"
import _RS from "../helpers/ResponseHelper";
import { UserInterface } from '../interfaces/modelInterfaces/UserInterface';
import User from '../models/User';
const cryptLib = require('@skavinvarnan/cryptlib');
class GlobalMiddleware {

    public formDataParser(req: any, res: any, next: any) {
        try {
            const form = formidable({ multiples: true });
            form.parse(req, (err, fields = {}, files) => {
                if (err) {
                    next(err);
                    return;
                }

                req.body.fields = { ...fields };
                req.body.files = files;

                next();
            });
        } catch (error) {
            next(error)
        }
    }

    /**
     * Authenticate Any Incoming Request to the server
     * @param req 
     * @param res 
     * @param next 
     */
    public async authenticate(req: any, res: any, next: any) {
        if (env().nodeEnv != "dev") {
            this.apikeyAuthenticate(req, res, next);
        }
        const authHeader = req.headers.authorization;
        const token = authHeader ? authHeader.slice(7, authHeader.length) : null;
        try {
            Jwt.verify(token, env().jwtSecret, (async (error: any, decode: any) => {
                if (error) {
                    console.log(error.message);
                    if (error.message == "jwt expired") {
                        req.errorStatus = 401;
                        return _RS.unAuthenticated(res, "JWT_EXPIRED", "User Not Authorized", {})
                    }
                    if (error.message == "jwt must be provided") {
                        req.errorStatus = 401;
                        return _RS.unAuthenticated(res, "JWT_NEEDED", "User Not Authorized", {})
                    }
                } else if (!decode) {
                    req.errorStatus = 401;
                    return _RS.unAuthenticated(res, "JWT_INVALID", "User Not Authorized", {})
                } else {

                    let user = await User.findOne({ _id: decode._id });
                    if (!user) {
                        req.errorStatus = 401;
                        return _RS.unAuthenticated(res, "USER_NOT_FOUND", "User Not Authorized", {})
                    }
                    if (user.is_locked) {
                        req.errorStatus = 403;
                        return _RS.unAuthorize(res, "ACCOUNT_LOCKED", "User Not Authorized", {})
                    }
                    req.userData = user;
                    console.log('userData', req.userData);
                    next();
                }
            }))
        } catch (error) {
            req.errorStatus = 401;
            next(error)
        }
    }

    /**
     * Authenticate Request if the request is encrypted.
     * @param req 
     * @param res 
     * @param next 
     * @returns 
     */
    public async apikeyAuthenticate(req: any, res: any, next: any) {
        try {

            if (req.headers.apikey) {
                const originalText = cryptLib.decryptCipherTextWithRandomIV(req.headers.apikey, env().apiKey);
                let keySplitted = originalText.split('-');
                let date = new Date();
                ///console.log(originalText,'original text',keySplitted,'time zone offes-->');  
                // let offset=date.getTimezoneOffset()*60*1000;
                let currentTimeStamp = Math.round((date.getTime()));
                /// console.log(currentTimeStamp,'current timestamp');   
                //currentTimeStamp=currentTimeStamp+offset;
                //let currentTimeStamp=Math.round(new Date().getTime());
                let requestDifference = Number(currentTimeStamp) - Number(keySplitted[1]);
                ///console.log(requestDifference,'*********Request difference**********');
                if (keySplitted[0] === env().apiKey && requestDifference < 15000 && requestDifference > -15000) {
                    next();
                } else {
                    return _RS.acceptanceRequired(res, 'FAILED', 'Please try again.', {});
                }
            }
            else {
                return _RS.acceptanceRequired(res, 'FAILED', 'Please try again.', {})
            }

        } catch (err) {
            next(err);
        }

    }

    public async usernameEmailAvailability(req: any, res: any, next: any) {
        try {
            const { username, email } = req.body.fields;
            let user: UserInterface = await User.findOne({ "$or": [{ username: username, profile_verified: true }, { email: email, profile_verified: true }] });
            if (user && user.username == username && user.profile_verified) {
                return _RS.conflict(res, "CONFLICT", "Username not available!", {})
            }
            if (user && user.email == email && user.profile_verified) {
                return _RS.conflict(res, "CONFLICT", "The email provided is already registered!", {})
            }
            next();
        } catch (err) {
            next(err);
        }
    }

    async checkUsernameEmailAvailability(req: any, res: any, next: any) {
        try {
            const { username, email } = req.body.fields;
            let user: UserInterface = await User.findOne({ "$or": [{ username: username, profile_verified: true }, { email: email, profile_verified: true }] });
            if (user && user.username == username && user.profile_verified && user._id.toString() != req.userData._id.toString()) {
                return _RS.conflict(res, "CONFLICT", "Username not available!", {})
            }
            if (user && user.email == email && user.profile_verified && user._id.toString() != req.userData._id.toString()) {
                return _RS.conflict(res, "CONFLICT", "The email provided is already registered!", {})
            }
            next();
        } catch (err) {
            next(err);
        }
    }

}

export default new GlobalMiddleware();