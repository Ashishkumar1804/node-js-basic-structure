
import { validate } from "../../helpers/ValidationHelper";
import * as Joi from "joi";
import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/RequestInterface"
import { UserInterface } from "../../interfaces/modelInterfaces/UserInterface";
import _RS from "../../helpers/ResponseHelper"
import User from "../../models/User";
class AuthValidation {
    static async register(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const schema = Joi.object().keys({
            username: Joi.string().required(),
            email: Joi.string().required().email(),
            password: Joi.string().required(),
        })
        const isValid = await validate(req.body.fields, res, schema);
        if (isValid) {
            next();
        }
    }

    static async contact(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const schema = Joi.object().keys({
            email: Joi.string().required().email(),
            subject: Joi.string().required(),
            text: Joi.string().required(),
        })
        const isValid = await validate(req.body, res, schema);
        if (isValid) {
            next();
        }
    }

    static async resendOtp(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const schema = Joi.object().keys({
            email: Joi.string().required().email(),
            type: Joi.string().required().valid('FORGET_PASSWORD', 'FORGET_USERNAME', 'USER_REGISTER', 'ACCOUNT_UNLOCK')
        })
        const isValid = await validate(req.body, res, schema);
        if (isValid) {
            next();
        }
    }

    static async login(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const schema = Joi.object().keys({
            username: Joi.string().required(),
            password: Joi.string().required(),
        })
        const isValid = await validate(req.body, res, schema);
        if (isValid) {
            next();
        }
    }
    static async deleteUser(req: ReqInterface, res: ResInterface, next: NextFunction) {
        if (req.userData.login_by == "manual") {
            const schema = Joi.object().keys({
                username: Joi.string().required(),
                password: Joi.string().required(),
            })
            const isValid = await validate(req.body, res, schema);
            if (isValid) {
                next();
            }
        } else {
            next();
        }

    }
    static async changePassword(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const schema = Joi.object().keys({
            old_password: Joi.string().required(),
            new_password: Joi.string().required(),
        })
        const isValid = await validate(req.body, res, schema);
        if (isValid) {
            next();
        }
    }

    static async editProfile(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const schema = Joi.object().keys({
            first_name: Joi.string().optional(),
            last_name: Joi.string().optional(),
            username: Joi.string().optional(),
            email: Joi.string().optional(),
            phone: Joi.string().optional(),
            preferences: Joi.string().optional()
        });
        const isValid = await validate(req.body.fields, res, schema);
        if (isValid) {
            next();
        }
    }


    static async verifyOtp(req: ReqInterface, res: ResInterface, next: NextFunction) {

        const schema = Joi.object().keys({
            email: Joi.string().required(),
            otp: Joi.string().required(),
        })
        const isValid = await validate(req.body, res, schema);
        if (isValid) {
            next();
        }
    }
    static async completeProfile(req: ReqInterface, res: ResInterface, next: NextFunction) {

        const schema = Joi.object().keys({
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            middle_name: Joi.optional(),
            phone: Joi.string().required(),
            date_of_birth: Joi.string().required(),
            preferences: Joi.array().optional()
        })
        const isValid = await validate(req.body, res, schema);
        if (isValid) {
            next();
        }
    }
    static async unlockAccountEmail(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const schema = Joi.object().keys({
            email: Joi.string().required().email(),
        })
        const isValid = await validate(req.body, res, schema);
        if (isValid) {
            next();
        }
    }
    static async forgetPassword(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const schema = Joi.object().keys({
            email: Joi.string().required().email(),
        })
        const isValid = await validate(req.body, res, schema);
        if (isValid) {
            next();
        }
    }
    static async forgetPasswordVerifyOtp(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const schema = Joi.object().keys({
            email: Joi.string().required().email(),
            otp: Joi.string().required(),
        })
        const isValid = await validate(req.body, res, schema);
        if (isValid) {
            next();
        }
    }
    static async resetUsername(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const schema = Joi.object().keys({
            email: Joi.string().required().email(),
            username: Joi.string().required(),
        })
        const isValid = await validate(req.body, res, schema);
        if (isValid) {
            let user: UserInterface = await User.findOne({ username: req.body.username })
            if (user) {
                return _RS.conflict(res, "CONFLICT", "Username not available", {})
            }
            next();
        }
    }
    static async socialLogin(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const schema = Joi.object().keys({
            email: Joi.string().required().email(),
            username: Joi.string().required(),
            ssid: Joi.required(),
            login_by: Joi.required()
        })
        const isValid = await validate(req.body.fields, res, schema);
        if (isValid) {
            let user: UserInterface = await User.findOne({ username: req.body.fields.username })
            if (user) {
                return _RS.conflict(res, "CONFLICT", "Username not available", {})
            }
            next();
        }
    }

    static async socialLoginCheck(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const schema = Joi.object().keys({
            ssid: Joi.required(),
            login_by: Joi.required()
        })
        const isValid = await validate(req.body, res, schema);
        if (isValid) {
            let user: UserInterface = await User.findOne({ ssid: req.body.ssid, login_by: req.body.login_by })
            if (!user) {
                return _RS.noContent(res, "NO_USER_AVAILABLE", "No User available!", {})
            }
            req.userData = user;
            next();
        }
    }



    static async resetPassword(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const schema = Joi.object().keys({
            email: Joi.string().required().email(),
            password: Joi.string().required(),
        })
        const isValid = await validate(req.body, res, schema);
        if (isValid) {
            next();
        }
    }


    static async unlockAccount(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const schema = Joi.object().keys({
            email: Joi.string().required().email(),
            otp: Joi.string().required(),
        })
        const isValid = await validate(req.body, res, schema);
        if (isValid) {
            next();
        }
    }

    static async followInterests(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const schema = Joi.object().keys({
            interests: Joi.string().required()
        })
        const isValid = await validate(req.body, res, schema);
        if (isValid) {
            next();
        }
    }
    static async massfollowInterests(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const schema = Joi.object().keys({
            interests: Joi.array().required()
        })
        const isValid = await validate(req.body, res, schema);
        if (isValid) {
            next();
        }
    }

}

export default AuthValidation